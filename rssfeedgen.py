import os
from bs4 import BeautifulSoup
from datetime import datetime
from pathlib import Path
from datetime import datetime
from xml.etree import ElementTree as ET
from xml.dom import minidom

def generate_rss_feed(site_url, site_title, site_description, articles):
    """
    Generate an RSS feed XML file
    
    Args:
        site_url (str): Your website's base URL
        site_title (str): Your website's title
        site_description (str): Website description
        articles (list): List of article dicts with title, link, description, pub_date
    """
    # Create the root RSS element
    rss = ET.Element('rss', version='2.0')
    
    # Create channel element
    channel = ET.SubElement(rss, 'channel')
    
    # Add required channel elements
    ET.SubElement(channel, 'title').text = site_title
    ET.SubElement(channel, 'link').text = site_url
    ET.SubElement(channel, 'description').text = site_description
    ET.SubElement(channel, 'language').text = 'en-us'
    
    # Add each article as an item
    for article in articles:
        item = ET.SubElement(channel, 'item')
        ET.SubElement(item, 'title').text = article['title']
        ET.SubElement(item, 'link').text = article['link']
        ET.SubElement(item, 'description').text = article['description']
        ET.SubElement(item, 'pubDate').text = article['pub_date']
        ET.SubElement(item, 'guid', isPermaLink="false").text = article['link']
    
    # Convert to a nicely formatted XML string
    rough_string = ET.tostring(rss, 'utf-8')
    parsed = minidom.parseString(rough_string)
    pretty_xml = parsed.toprettyxml(indent="  ")
    
    # Save to file
    with open('feed.xml', 'w') as f:
        f.write(pretty_xml)

def generate_rss_from_static_site(content_dir, site_url, site_title, site_description):
    articles = []
    
    # Scan content directory for HTML files
    for file_path in Path(content_dir).glob('**/*.html'):
        if file_path.name.startswith('_') or file_path.name == 'index.html':
            continue
            
        with open(file_path, 'r') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
            
            title = soup.title.string if soup.title else file_path.stem
            description = soup.find('meta', attrs={'name': 'description'})
            description = description['content'] if description else title
            
            # Get modification time as publication date
            mod_time = datetime.fromtimestamp(file_path.stat().st_mtime)
            pub_date = mod_time.strftime('%a, %d %b %Y %H:%M:%S GMT')
            
            articles.append({
                'title': title,
                'link': f"{site_url}/{file_path.stem}",
                'description': description,
                'pub_date': pub_date
            })
    
    # Sort by publication date (newest first)
    articles.sort(key=lambda x: x['pub_date'], reverse=True)
    
    # Generate RSS feed (using the function from Option 1)
    generate_rss_feed(site_url, site_title, site_description, articles)

# Example usage
generate_rss_from_static_site(
    content_dir='./articles',
    site_url='https://gohar-shahi.com',
    site_title='Riaz Ahmed Gohar Shahi (Imam Mehdi)',
    site_description='Introduction of Riaz AHmed Gohar Shahi and His Teaching'
)