![Build Status](https://codeship.com/projects/83a808e0-0f28-0135-07fc-6e1e0c265962/status?branch=master)
![Code Climate](https://codeclimate.com/github/taylordorin/recipe-box.png)



@import url(http://fonts.googleapis.com/css?family=Lato:400,900);  /* <-- Just for the demo, Yes I like pretty fonts... */

.square {
  float:left;
  position: relative;
  width: 20%;
  padding-bottom : 20%; /* = width for a 1:1 aspect ratio */
  margin:1.66%;
  overflow:hidden;
}

.box-value {
  font-size: 1.333rem;
  font-weight: bold;
}

.content {
    position:absolute;
    height:80%; /* = 100% - 2*10% padding */
    width:90%; /* = 100% - 2*5% padding */
    padding: 10% 5%;
}

.table{
    display:table;
    height:100%;
    width:100%;
}
.table-cell{
  display: table-cell;
  vertical-align: middle;
  height: 100%;
  width: 100%;
  padding-left: 18px;
  padding-top: 50px;
}

/*  For responsive images */

.content .rs{
  width:auto;
  height:auto;
  max-height:90%;
  max-width:100%;
}
/*  For responsive images as background */

.bg{
  background-position:center center;
  background-repeat:no-repeat;
  background-size:cover; /* you change this to "contain" if you don't want the images to be cropped */
  color:#fff;
}

.img1{
  background-image: image-url('landing-page-apron.jpg');
}
.img2{
  background-image: url('https://farm7.staticflickr.com/6217/6216951796_e50778255c.jpg');
}
.img3{
  background-image: url('https://farm4.staticflickr.com/3794/13893055574_3df0ab636b.jpg');
}
.img4{
  background-image: url('https://farm3.staticflickr.com/2827/10384422264_d9c7299146.jpg');
}
.img5{
  background-image: url('https://farm7.staticflickr.com/6217/6216951796_e50778255c.jpg');
}
.img6{
  background-image: url('https://farm4.staticflickr.com/3794/13893055574_3df0ab636b.jpg');
}
.img7{
  background-image: url('https://farm3.staticflickr.com/2827/10384422264_d9c7299146.jpg');
}
.img8{
  background-image: url('https://farm7.staticflickr.com/6217/6216951796_e50778255c.jpg');
}
.img9{
  background-image: url('https://farm4.staticflickr.com/3794/13893055574_3df0ab636b.jpg');
}
.img10{
  background-image: url('https://farm3.staticflickr.com/2827/10384422264_d9c7299146.jpg');
}
.img11{
  background-image: url('https://farm7.staticflickr.com/6217/6216951796_e50778255c.jpg');
}
.img12{
  background-image: url('https://farm4.staticflickr.com/3794/13893055574_3df0ab636b.jpg');
}

/*  following just for the demo */


body {
  font-size:20px;
  font-family: 'Lato',verdana, sans-serif;
  color: #fff;
  text-align:center;
  background:#ECECEC;
}

.numbers{
  font-weight:900;
  font-size:100px;
}
