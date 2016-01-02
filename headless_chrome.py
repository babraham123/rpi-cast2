from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

url = 'http://www.filmon.com/tv/channel/export?channel_id=1793&affid=55882Lf'
delay = 30
video_url = None

def find_url(msg):
    words = msg.split(' ')
    for word in words:
        if "204.107.27.196" in word:
            return word
    return None

# enable browser logging
d = DesiredCapabilities.CHROME
d['loggingPrefs'] = {'browser': 'ALL', 'client': 'ALL', 'driver': 'ALL', 'performance': 'ALL', 'server': 'ALL'}
browser = webdriver.Chrome(desired_capabilities=d)
print browser.title
print

# load site
browser.get(url)
time.sleep(delay)

# print messages
llog = 'browser'
for entry in browser.get_log(llog):
    print entry
    video_url = find_url(entry['message'])
    print video_url


raise Exception('contrived')
# get element
#elem = browser.find_element_by_css_selector('#playerID2')

browser.quit()

