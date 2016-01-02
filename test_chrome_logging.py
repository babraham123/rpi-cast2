# test that console.log can be accessed from the browser

from selenium import webdriver 
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities   

# enable browser logging
d = DesiredCapabilities.CHROME
d['loggingPrefs'] = { 'browser':'ALL' }
browser = webdriver.Chrome(desired_capabilities=d)
browser.get('http://bereketabraham.com')

print browser.title
# print messages
for entry in browser.get_log('browser'):
    print entry
    
browser.quit()
