// random-img.js - 侧边栏随机图片模块

function changeRandomImg() {
    const imgElement = document.getElementById("random-sidebar-img");
    if (!imgElement) return; // 如果没找到图片容器，就停止运行

    // 👇 你的图库（以后加图片就在这里加，随便换行，非常好维护）
    const imgList = [
        "/img/zawu/a014b6131153107dfdc215f04c1433c4_720.jpg", // 睡觉的海豹
        "/img/你的其他图片1.jpg", 
        "/img/你的其他图片2.gif"
        // 注意：除了最后一行，前面的每一行结尾都要有逗号
    ];

    // 随机抽取逻辑
    const randomIndex = Math.floor(Math.random() * imgList.length);
    imgElement.src = imgList[randomIndex];
}

// 确保网页首次加载、以及页面无刷新跳转(Pjax)时，都会执行换图
document.addEventListener("DOMContentLoaded", changeRandomImg);
document.addEventListener("pjax:complete", changeRandomImg);