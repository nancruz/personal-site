---
title: 5 tips to speed up your web application animations
date: 2020-09-02
description: Web animations don't need to be complicated. Learn how to turn them into smooth and pleasant animations.
tags:
  - JavaScript
  - CSS
  - HTML
  - Performance
---
*Note: This post was originally posted in [Feedzai Techblog](https://medium.com/feedzaitech/5-tips-to-speed-up-your-web-application-animations-2086bdaff04e?source=friends_link&sk=a3c2706a0fffaa0e4dd29255950e603a)*

![Header image](/header.jpg)
When building an application, developers and designers often use animations to provide the most impressive user experience. While strong animation can enhance your users' overall experiences, a clumsy one can cause headaches and lead to abandonment. Following best practices can help you avoid some common animation pitfalls.

So how do animations work? With the introduction of new web technologies along with new design trends, animations are getting more advanced and complex. Those animations are, to some extent, done by applying complex CSS rules or using JavaScript logic such as adding or removing nodes from the DOM. However, this complexity comes at a cost. If animations undergo a clumsy implementation, the final result could be a slow and sluggish web page, especially for users with low-end devices.

It's a case where the famous quote from Spider-Man's Uncle Ben applies: "With great power, comes great responsibility!" Beyond the world of comic books, this philosophy also applies to web applications. You have a responsibility to ensure that all users are able to enjoy a smooth, seamless experience. Here are a few ways you can produce animations that deliver on that responsibility.

![Uncle Ben quote gif](https://media.giphy.com/media/MCZ39lz83o5lC/source.gif)

# Watch out for jank
The term frames per second (FPS) or frame rate is often used as a way to measure the performance of gaming computers. Usually, a higher FPS number is a good performance indicator. A lower FPS number, meanwhile, means the browser took more time to deliver a frame than expected, an experience known as **"jank"** that refers to a substandard performance of our application.

What causes jank? Before answering that question, let's talk about what "frame" and "frame rate" mean. A "frame" is a static image that, when put in sequence with other slightly different static images, produces the illusion of movement. The human brain can process 10 to 12 separate frames per second. Above that value is where the motion illusion begins. The number of frames displayed per second is what we call "frame rate".

Most devices today can redraw the screen 60 times per second. This metric is called refresh rate and is measured in Hertz (Hz). Next time you buy a fancy monitor I hope the 60Hz number in the specifications won't be strange to you. But how does the refresh rate and FPS relate to each other?

When performing an animation, the browser will try to match the refresh rate as close as possible. This means that, in the best case, the browser will deliver 60 frames per second (FPS), leaving it with approximately 16ms to deliver each frame (1000ms / 60). In practice, the browser isn't only busy rendering the frame, it also has some extra work to do (e.g., garbage collection). By taking this into consideration, the best practices recommend using 10ms as the maximum time spent rendering a frame, leaving the rest of the time for housekeeping work.

What happens if the browser is unable to render a frame within the 10ms budget? If the browser takes twice the time (~32ms) to render a frame, the frame rate will drop from 60 to 30 FPS. This drop in the number of frames will cause certain delays in the animation, leading to a negative impact - or jank - on the user experience.

# Maintain the pixel pipeline

![Figure 1](/pixel_pipeline.png)
*Figure 1 - Pixel pipeline.*

When you visit a webpage, the browser downloads a set of different files (including media and JavaScript files) required to render the page. From the moment it gets the files to the final pixels on the screen, the browser goes through a process called pixel pipeline. The **pixel pipeline** involves five different steps:

- **JavaScript.** Most animations on a web page are triggered by some JavaScript logic. The most common ones add or remove elements from the DOM tree or toggle CSS classes from certain elements.
*Note:* Some animations are also triggered by CSS.

- **Style.** This is where the browser computes the CSS styles for each DOM node. It goes through each DOM node and, by looking at the list of CSS rules, applies the ones based on the [matching selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors). Whenever a rule isn't specified or filled in with a value, the browser inherits from the parent node or applies a default value.

- **Layout.** After knowing how the elements will look, the browser will compute how much space is required for them and what is their final position on the screen. Knowing the size and position of each element can be a stressful task for the browser because one element can affect others.

- **Paint.** As the name suggests, this step is where the browser starts painting the elements. Paint is typically applied to multiple surfaces or "layers".

- **Composite.** This step is very similar to what a photographer does when taking family pictures. After arranging everyone in the right place and in the right row - let's imagine that the smaller ones are in the front and the tallers ones are in the back - the photographer takes a picture (frame) of everyone. What the browser does is similar. It stacks all the layers together (in the right order) and draws them on the screen.

Two observations regarding the pipeline:
1) Some steps might not be executed during an animation, for example, if only the *background-color* property changes, the layout step isn't executed.
2) The steps have different computational costs.

# Write performant animations
Respecting the integrity of the pixel pipeline and being on guard for jank-related issues are not the only ways you can improve your animations. There are also several tools available to help you write **performant animations** that will enhance your applications. Here are a few ways to write impressive performant animations.

## 1. requestAnimationFrame is your best friend
At first sight, _setTimeout_ and _setInterval_ are great candidates to use when writing an animation loop. The problem with those two functions is that they don't ensure the execution of your code at the start of a frame, which can lead to some frames being missed. To avoid this problem, you should use the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) function. It ensures that your code runs at the beginning of each frame.

## 2. Debouncing or throttling events
Usually, it is not a good idea to directly attach functions to DOM events that can be triggered multiple times in a short period of time. For example, a scroll event can be easily triggered 30 times per second, while in a smartphone the same event can be triggered hundreds of times per second. If you have a complex function directly attached to it, scrolling will easily become slow and unresponsive.

To avoid this problem, you should adopt techniques like [debouncing or throttling](https://css-tricks.com/debouncing-throttling-explained-examples/) to reduce the number of triggered calls. This can alleviate the browser's workload and improve the scrolling experience.

## 3. Don't overcomplicate your selectors
Do you remember the __Style__ step from the pipeline above? It just so happens that computing the style rules from matching selectors can be quite burdensome for the browser. This means that the more complex the selector, the higher the probability of increasing the execution time in this step. A simple, yet very effective approach is to assign a specific class to those elements. It is easier for the browser to match that class with the selector.

When it comes to creating CSS class names, one of the recommendations from the community is to use the [BEM (Block, Element, Modifier)](https://en.bem.info/) methodology.

To better understand what was described before, imagine a scenario where we need to style a set of elements that look like boxes. In the design specification, there's a rule that says: "each odd box should have a right margin of 10px, while each even box should have 5px instead". The image below describes the final goal.

![Figure 2](/selector-complexity.png)
_Figure 2 - Different margins between boxes using same css class name._

The above example can be easily accomplished with the following CSS rules:

```css
.box { margin-right: 10px; }
.box:nth-child(even) { margin-right: 5px; }
```

The problem with this approach is that the _:nth-child_ CSS [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) requires extra work from the browser. For each .box element, it needs to ask, "Is this an odd or an even element?"

As mentioned before, a possible solution is to create specific CSS classes to reduce the selector complexity.

![Figure 3](/selector.png)
_Figure 3- Different margins between boxes using different css class name._

For this particular example, we can achieve the same result with:

```css
.box { margin-right: 10px; }
.box - even { margin-right: 5px; }
```

By removing the pseudo-class and replacing it with a specific CSS class we are reducing the amount of work required by the browser in the __Style__ step.

## 4. GPU to the rescue
Not every animation has to go through each stage of the pipeline process. Let's take as an example a menu that slides from left to right. The first thing that comes to your mind is to give it a `position: absolute` value and then play with the left property, increasing its value to slide it to the right and decreasing the value to slide it to the left.

Changing geometry properties like _width_, _height_, _left_ or _right_ don't affect only the element itself. It requires the browser to recompute the layout for the entire document. The more elements you have, the more complex and time consuming the operation is. Once the layout changes, any damaged pixels will need to be painted and the page must then be composited together. If you are interested in learning which steps of the pipeline are affected when changing a CSS property, you can check the [CSS Triggers](https://csstriggers.com/word-spacing) page.

But what if I told you that you can skip some of the pipeline steps and avoid extra computation? Instead of playing with the _left_ property, you can use the _transform_ property. This property has the advantage of working only at the __Composite__ step level and skips the expensive __Paint__ and Layout steps. The only caveat is that the element needs to be on its own layer.

To promote an element to its own layer, you need to use the _will-change_ property. Use this property carefully because GPU memory is limited.

To demonstrate what has been mentioned in this section, we implemented two versions of the sliding menu example. The first one uses the _transform_ and _will-change_ property while the other one does not use any of those properties. It uses the _left_ geometric property instead.

Example 1: https://codesandbox.io/s/animations-blog-post-slide-animation-v6994
Example 2: https://codesandbox.io/s/animations-blog-post-slide-animation-no-layer-dcv6v

To actually compare the difference between the two implementations, we took two snapshots from the available Performance tab in Chrome's dev tool, one for each example.

![Figure 4](/animation-layers-overview.png)
_Figure 4- Pixel pipeline from example 1._

![Figure 5](/animation-no-layers-main.png)
_Figure 5- Pixel pipeline from example 2._

If we compare Figure 1 and Figure 2, we can clearly see the difference in the pixel pipeline execution between both implementations. In the first case, we skip the expensive __Layout__ and __Paint__ steps from the pipeline while in the last case we go through all the steps.

__Note:__ Did you notice that red bar in Figure 2? It is Chrome warning you that multiple [Cumulative Layout Shift](https://web.dev/cls) can cause poor user experiences.

## 5. Debugging tools
Tools such as the [Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference) tab in Chrome DevTools contain a lot of data that can help you debug the performance of your application. To make the most of it, it is very important that you read and understand the data available there. If this is new to you, then take some time to learn more about it.

# Final thoughts
As frontend developers, our ultimate goal is to provide the best user experience. Animations can be a very sensitive part of that experience that shouldn't be neglected. When delivering an animation, there are a few key concepts that we must bear in mind. In the process of painting pixels into the screen, there are a few steps that can be directly impacted by our work.

Studies have shown that online businesses can be affected by bad user experiences. I hope that these useful tips can help you build the next smooth animation to offer the best user experience your product deserves.

# References
https://developers.google.com/web/fundamentals/performance/rendering
https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/