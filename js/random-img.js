// random-img.js - 侧边栏随机图片模块

function changeRandomImg() {
    const imgElement = document.getElementById("random-sidebar-img");
    if (!imgElement) return; // 如果没找到图片容器，就停止运行

    // 👇 你的图库（以后加图片就在这里加，随便换行，非常好维护）
    const imgList = [
        "/img/yelu/1.jpg", 
        "/img/yelu/2.gif", 
        "/img/yelu/3.gif", 
        "/img/yelu/4.gif", 
        "/img/yelu/5.jpg", 
        "/img/yelu/6.jpg", 
        "/img/yelu/7.gif", 
        "/img/yelu/8.jpg", 
        "/img/yelu/9.gif", 
        "/img/yelu/10.gif", 
        "/img/yelu/11.gif", 
        "/img/yelu/12.jpg", 
        "/img/yelu/13.jpg", 
        "/img/yelu/14.jpg", 
        "/img/yelu/15.jpg", 
        "/img/yelu/16.jpg", 
        "/img/yelu/17.jpg", 
        "/img/yelu/18.jpg", 
        "/img/yelu/19.jpg", 
        "/img/yelu/20.jpg", 
        "/img/yelu/21.gif", 
        "/img/yelu/22.jpg", 
        "/img/yelu/23.gif", 
        "/img/yelu/24.jpg", 
        "/img/yelu/25.jpg", 
        "/img/yelu/26.jpg", 
        "/img/yelu/27.jpg", 
        "/img/yelu/28.jpg", 
        "/img/yelu/29.jpg", 
        "/img/yelu/30.jpg", 
        "/img/yelu/31.jpg", 
        "/img/yelu/32.jpg", 
        "/img/yelu/33.jpg", 
        "/img/yelu/34.jpg", 
        "/img/yelu/35.jpg", 
        "/img/yelu/36.jpg", 
        "/img/yelu/37.jpg", 
        "/img/yelu/38.jpg", 
        "/img/yelu/39.jpg", 
        "/img/yelu/40.jpg",
        "/img/yelu/41.gif"
    ];

    // 随机抽取逻辑
    const randomIndex = Math.floor(Math.random() * imgList.length);
    imgElement.src = imgList[randomIndex];
}

// 确保网页首次加载、以及页面无刷新跳转(Pjax)时，都会执行换图
document.addEventListener("DOMContentLoaded", changeRandomImg);
document.addEventListener("pjax:complete", changeRandomImg);