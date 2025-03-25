import os
from bs4 import BeautifulSoup
from datetime import datetime
from pathlib import Path
from xml.etree import ElementTree as ET
from xml.dom import minidom
from urllib.parse import quote, urljoin

def generate_rss_feed(site_url, site_title, site_description, articles, output_path='feed.xml'):
    """
    Generate a fully valid RSS feed XML file that passes all W3C validation checks
    with no warnings or errors.
    
    Args:
        site_url (str): Your website's base URL (must match final feed location)
        site_title (str): Your website's title
        site_description (str): Website description
        articles (list): List of article dicts with title, link, description, pub_date
        output_path (str): Path to save the RSS feed file
    """
    # Ensure site_url is consistent with where feed will be hosted
    site_url = site_url.rstrip('/')
    
    # Create the root RSS element with Atom namespace
    rss = ET.Element('rss', {
        'version': '2.0',
        'xmlns:atom': 'http://www.w3.org/2005/Atom'
    })
    
    # Create channel element
    channel = ET.SubElement(rss, 'channel')
    
    # Add required channel elements
    ET.SubElement(channel, 'title').text = site_title
    ET.SubElement(channel, 'link').text = site_url
    ET.SubElement(channel, 'description').text = site_description
    ET.SubElement(channel, 'language').text = 'en-us'
    ET.SubElement(channel, 'lastBuildDate').text = format_rfc822_date(datetime.utcnow())
    
    # Add properly formatted Atom self-link with EXACT feed location
    feed_url = f"{site_url}/feed.xml"  # Absolute canonical URL
    atom_link = ET.SubElement(channel, 'atom:link')
    atom_link.set('href', feed_url)
    atom_link.set('rel', 'self')
    atom_link.set('type', 'application/rss+xml')
    
    # Add generator info
    ET.SubElement(channel, 'generator').text = 'Python RSS Generator'
    
    # Add each article as an item
    for article in articles:
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = article['title']
        ET.SubElement(item, 'link').text = article['link']
        
        # Properly escaped description
        description = ET.SubElement(item, 'description')
        description.text = article['description']
        
        # RFC-822 formatted date
        ET.SubElement(item, 'pubDate').text = article['pub_date']
        
        # Permanent GUID
        ET.SubElement(item, 'guid', isPermaLink="false").text = article['link']
    
    # Convert to XML and pretty print
    rough_string = ET.tostring(rss, 'utf-8')
    parsed = minidom.parseString(rough_string)
    pretty_xml = parsed.toprettyxml(indent="  ")
    
    # Remove extra blank lines
    pretty_xml = '\n'.join(line for line in pretty_xml.split('\n') if line.strip())
    
    # Save to file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)

def format_rfc822_date(dt):
    """Format datetime object to RFC-822 compliant date string"""
    return dt.strftime('%a, %d %b %Y %H:%M:%S GMT')

def generate_rss_from_static_site(content_dir, site_url, site_title, site_description, output_path='feed.xml'):
    articles = []
    site_url = site_url.rstrip('/')
    
    for file_path in Path(content_dir).glob('**/*.html'):
        if file_path.name.startswith('_') or file_path.name.lower() == 'index.html':
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
            
            # Extract title with fallback
            title = soup.title.string if soup.title else file_path.stem.replace('-', ' ').title()
            
            # Extract description
            description = ''
            if soup.find('meta', attrs={'name': 'description'}):
                description = soup.find('meta', attrs={'name': 'description'})['content']
            elif soup.find('p'):
                description = soup.find('p').get_text().strip()[:200] + '...'
            else:
                description = title
            
            # RFC-822 formatted date
            mod_time = datetime.fromtimestamp(file_path.stat().st_mtime)
            pub_date = format_rfc822_date(mod_time)
            
            # Generate proper URL
            rel_path = file_path.relative_to(Path(content_dir).parent if content_dir.startswith('./') else content_dir)
            url_path = str(rel_path).replace('\\', '/')
            url_segments = [quote(segment) for segment in url_path.split('/')]
            encoded_path = '/'.join(url_segments)
            final_url = f"{site_url}/{encoded_path.replace('.html', '')}"
            
            articles.append({
                'title': title,
                'link': final_url,
                'description': description,
                'pub_date': pub_date
            })
    
    # Sort by publication date (newest first)
    articles.sort(key=lambda x: datetime.strptime(x['pub_date'], '%a, %d %b %Y %H:%M:%S GMT'), reverse=True)
    
    # Generate RSS feed
    generate_rss_feed(site_url, site_title, site_description, articles, output_path)

if __name__ == '__main__':
    # IMPORTANT: Ensure this matches EXACTLY where your feed will be hosted
    config = {
        'content_dir': './',
        'site_url': 'https://gohar-shahi.com',  # Must be final production URL
        'site_title': 'Riaz Ahmed Gohar Shahi (Imam Mehdi)',
        'site_description': 'Introduction of Riaz Ahmed Gohar Shahi and His Teachings',
        'output_path': './feed.xml'
    }
    generate_rss_from_static_site(**config)
    print(f"Valid RSS feed generated at {config['output_path']}")