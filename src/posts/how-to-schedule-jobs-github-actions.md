---
title: How to Schedule Jobs with Github Actions
date: 2021-04-14
description: Github Actions are an easy and free way to automate your jobs.
tags:
  - JavaScript
  - Automation
  - DevOps
  - Github
---

![Cover image](/how-to-schedule-jobs-header.jpg)
Photo by [Safar Safarov](https://unsplash.com/@codestorm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/coding?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
  
Recently, I've started building a [web scraper to collect houses](https://github.com/nancruz/house-scraper) available for sale from real state websites. The main goal was to learn how to use [Next.js](https://nextjs.org/) and, at the same time, build something useful for me - Yes, I'm looking for a house to buy!

The web scraping part isn't going to be the focus of this blog post. If you are interested in that, there are several [solutions out there to use](https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js).
Instead, I'm going to focus on the automation part, i.e., after having the web scraper ready to collect data, how can I turn it into an autonomous solution that periodically collects data?

## Free stuff is awesome 🎉
I don't like spending money even less in services used in personal projects. If possible, I always look for free solutions available in the market to build my project - Portuguese people love free stuff even if it is not useful 🇵🇹.

In the particular case of running the web scraper periodically, I had three solutions in mind:

1. Create a cron job in my personal computer and run the scraper there;
2. Create a VPS, deploy the scraper and create a cron job to run periodically;
3. Use Github Actions to run my scraper.

Solution 1) was free but required me to have the computer 24/7 on to guarantee that the scraper collects all the daily information. The free part was cool, but I don't always have my computer turned on so, this solution is a NO ❌.

Solution 2) allows me to solve the problem of having the personal computer always on, but a VPS costs money right? Besides that, some of them can take some hours to configure which can be kinda boring when you are excited to have your personal project up and running. This solution is a NO ❌.

Solution 3) has the best of both worlds. It is free and doesn't require me to have a personal computer running 24/7. According to Github, [Github Actions](https://github.com/features/actions) are _"individual tasks that you can combine to create jobs and customize your workflow."_. The cool part is that you can create your own custom actions or use actions from the community, which can help you save a lot of time. This solution is a YES ✅.

Basically, Github Actions gave me what I needed. It allowed me to setup a job that can run a web scraper and schedule it to run every day at 00:00.

Here is the action configuration:

```json
on:
  schedule:
    - cron:  '0 0 * * *'
name: Scrap Data
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Build
      working-directory: ./scraper
      run: npm install
    - name: Scrape
      env:
        DB_PATH: ../client/data/db.json
      working-directory: ./scraper
      run: npm run scraper
    - uses: mikeal/publish-to-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GitHub sets this for you
```

This action is split in two parts:
1. __Trigger__
```
on:
  schedule:
    - cron:  '0 0 * * *'
```

This part is where I can schedule the job. I'm using a temporal trigger, but other [types of triggers](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#webhook-events) can be used, for example each time a commit is pushed to master.

2. __Jobs Configuration__
```
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Build
      working-directory: ./scraper
      run: npm install
    - name: Scrape
      env:
        DB_PATH: ../client/data/db.json
      working-directory: ./scraper
      run: npm run scraper
    - uses: mikeal/publish-to-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GitHub sets this for you
```
This part is where I configure which jobs should run when the action is triggered. In this particular example, I'm configuring a job named __Build__ that runs the following steps:
1. Checkout the master brach;
2. Installs the scraper dependencies;
3. Runs the scraper;
4. Pushes the collected information to the master brach.
This last step is using the [publish-to-github-action-action](https://github.com/mikeal/publish-to-github-action) Github Action.

You can find more information about [jobs in the official documentation](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobs).

Voilá! I have a fully working web scraper collecting data every day for me without speding a single €.

I hope you liked it.

Happy coding 🤓,
_Nuno Cruz_
