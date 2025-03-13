import os
import datetime
import urllib.parse
from xml.etree.ElementTree import Element, SubElement, tostring, ElementTree

def generate_sitemap(directory, output_file="sitemap.xml", base_url="https://example.com"):
    """
    Generates a sitemap.xml file for all .html files in the given directory.

    :param directory: Directory to scan for .html files
    :param output_file: Name of the output sitemap file
    :param base_url: Base URL for the site
    """
    # Root of the sitemap
    urlset = Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    today = datetime.date.today().isoformat()

    for root, _, files in os.walk(directory):
        if root == ".git":
            return
        for file in files:
            if file.endswith(".html"):
                # Construct the URL
                relative_path = os.path.relpath(os.path.join(root, file), directory)
                # calculate the path of file to root directory (directory which is provide in parater e.g "./")
                url = f"{base_url}/{relative_path.replace(os.sep, '/')}"
                
                # Add URL to sitemap
                url_tag = SubElement(urlset, 'url')
                loc_tag = SubElement(url_tag, 'loc')
                loc_tag.text = url
                lastmod_tag = SubElement(url_tag, 'lastmod')
                lastmod_tag.text = today
                changefreq_tag = SubElement(url_tag, 'changefreq')
                changefreq_tag.text = 'daily'
                priority_tag = SubElement(url_tag, 'priority')
                priority_tag.text = '0.8'
            if file.endswith(".pdf"):
                relative_path = os.path.relpath(os.path.join(root,file),directory)
                print(os.path.join("gohar",file))
                print(os.path.relpath(os.path.join(root,file),directory),"-- relative path to root")
                url = f"{base_url}/{relative_path.replace(os.sep,'/')}"
                url = urllib.parse.quote(url,":/");

                # Add URL to sitemap                              
                url_tag = SubElement(urlset, 'url')               
                loc_tag = SubElement(url_tag, 'loc')              
                loc_tag.text = url                                
                lastmod_tag = SubElement(url_tag, 'lastmod')      
                lastmod_tag.text = today                          
                changefreq_tag = SubElement(url_tag, 'changefreq')
                changefreq_tag.text = 'daily'                     
                priority_tag = SubElement(url_tag, 'priority')    
                priority_tag.text = '0.7'                         












    # Write to sitemap.xml
    tree = ElementTree(urlset)
    tree.write(output_file, encoding='utf-8', xml_declaration=True)
    print(f"Sitemap generated: {output_file}")



# Example usage
if __name__ == "__main__":
    # Specify the directory containing HTML files
    html_directory = "./"  # Change to your directory
    generate_sitemap(html_directory, base_url="https://gohar-shahi.com")
