# About
Pattern Lock that I've made in 2017


# Overview
It's a Pattern Lock from Xiaomi Phone<br>
**_I've made it in purpose of practicing and getting some experience in programming field so don't ask the question why I made it on PC_**

## Lock code

* In `circles.js` you can find the following local variable:
```
this.lock = [1, 5, 9,
	     6, 3, 2,
             4, 7, 8];
```
_lock_ is an array of the correct sequence of dots you should connect. After connecting dots displaying on canvas `lock` is comparing with `checked` var, which contains the sequence of dots user has connected. If the value of `checked` is equal to the value of `lock` then lock grants access, otherwise the error is displaying on the top of the screen. You can change the value of this variable if you want other lock code to be set.


