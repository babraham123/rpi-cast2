# test that chrome loads properly in a headless environment

from selenium import webdriver 

browser = webdriver.Chrome()
browser.get('http://www.google.com')
print browser.title

browser.quit()

