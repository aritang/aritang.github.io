---
title: "concatenate images"
date: 2025-01-31T23:46:36+08:00
draft: false
---

When I have to show a series of  experiment results plottings, I used to use Meitu (a phone photoshop app) to first airdrop all images to my iphone, concatenate all the images, and them airdrop back to my mac.

Not anymore now I got my hands on Imagemagick (https://imagemagick.org/).

{{<figure align="center" src="https://raw.githubusercontent.com/aritang/aritangPictures/main/static/data_vis/magick_wizard.jpeg" caption="ImageMagick[®](http://tarr.uspto.gov/servlet/tarr?regser=serial&entry=78333969) is a free, [open-source](https://imagemagick.org/script/license.php) software suite, used for editing and manipulating digital images. It can be used to create, edit, compose, or convert bitmap images, and supports a wide range of file [formats](https://imagemagick.org/script/formats.php), including JPEG, PNG, GIF, TIFF, and Ultra HDR." width="88%">}}

Although when operated on PDF it loses the vector proporty but overall, being able to concatenate image by a single command operation in terminal is fascinating:

```bash
magick convert figure_1.pdf figure_2.pdf -append target_figure_name.pdf
```
