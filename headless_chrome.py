from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

url = 'http://www.filmon.com/tv/channel/export?channel_id=1793&affid=55882Lf'
display = Display(visible=0, size=(800, 600))
display.start()

# enable browser logging
d = DesiredCapabilities.CHROME
d['loggingPrefs'] = { 'browser':'ALL' }
browser = webdriver.Chrome(desired_capabilities=d)
print browser.title
print

# load site
browser.get(url)
time.sleep(90)
# print messages
for entry in browser.get_log('browser'):
    print entry
#    print entry['message']

browser.quit()
display.stop()
