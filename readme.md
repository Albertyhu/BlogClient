<h1 align="center">Blabber social media site</h1>

![Blabber icon](https://i.imgur.com/7P3lFMH.png)

[Go to live site](https://blabber-71b2c.web.app/)

[Github link to the Node JS API](https://github.com/Albertyhu/BlogAPI)

Blabber is a social media that allows users to speak their mind. It communicates with an API that I built with Node JS.

It gives users many features found in prevalent social media sites such as Facebook and Instagram to play around with such as: 

1. Creating a post with a rich text editor. 
![Rich text editor](https://i.imgur.com/2igTwYf.jpg)

2. Making replies. 
![Comment tree](https://i.imgur.com/Np5c7tt.jpg)

3. Liking posts and comments

4. Perusing through other users' profiles
![Members area](https://i.imgur.com/fAbtCfh.jpg)

5. Bulk upload images 
![Gallery](https://i.imgur.com/G7nGoRi.jpg)

6. Use filters to search for content on the site
![Filtered search results](https://i.imgur.com/SPMivbf.jpg)

**Making an app that anyone can use**

The site is built with a lot attention to making sure that the user experience is seamless. 
I wanted to make sure that anyone who is not technically savvy can intuitively navigate through the app.
1. Mobile responsiveness 
2. Color direction
3. Filtered search feature 
4. Previewed images before loading 
5. LinkedIn-style comment tree 
6. Intuitive icons 

**Desktop view**

![Home screen](https://i.imgur.com/DE4ER6w.jpg)

**Mobile view**

![Mobile screen](https://i.imgur.com/kv2iXbN.jpg)

**Speed optimization techniques used**

Fast performance is an important pillar of a seamless user experience. 
Nobody wants to wait more than 5 seconds for content to load. 
In the age of abundant information constantly bombarding the typical internet surfer, it is important that applications perform optimally. 
Firstly, I used **code splitting** to break down the application into smaller chunks that can be loaded independently, allowing the user to only download the code they need to view a specific page. This reduced the initial loading time of the app and improved the overall performance. 
Secondly, I optimized images using **compression** to reduce the file size of images without losing quality, which in turn decreased the loading time of the images. 
Finally, I implemented **lazy loaded components**, which means that components that are not immediately needed are not loaded until the user requests them, helping to reduce the initial load time of the page. By using these three techniques, I was able to significantly improve the speed and performance of my React JS app, resulting in a better user experience.

**Technologies used**

1. ReactJS
2. Tailwind CSS 
3. NodeJS
4. MongoDB
5. Vite

