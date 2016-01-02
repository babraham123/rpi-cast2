# test that console.log can be accessed from the browser

from pyvirtualdisplay import Display
from selenium import webdriver 
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities   

display = Display(visible=0, size=(800, 600))
display.start()

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
display.stop()
