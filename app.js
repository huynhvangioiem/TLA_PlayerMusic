$(document).ready(function () {
    const get = document.querySelector.bind(document);
    const gets = document.querySelectorAll.bind(document);

    const player = get(".player");
    const playlist = get(".playlist");
    const cd = get(".cd-thumb");

    const app = {

        songs: [
            {
                name: "Hãy Cho Chúng Tôi Thấy",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Hay-Cho-Chung-Toi-Thay-Phan-Manh-Quynh.mp3",
                image: "img/1517194642254_640.jpg"
            },
            {
                name: "Huyền Thoại",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Huyen-Thoai-Phan-Manh-Quynh.mp3",
                image: "img/1547109568814_500.jpg"
            },
            {
                name: "Sao Cha Không - Bố Già OST",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Sao-Cha-Khong-Bo-Gia-OST-Phan-Manh-Quynh.mp3",
                image: "img/f31efb0da9bc984d7246866e6d529d78.jpg"
            },
            {
                name: "Hãy Cho Chúng Tôi Thấy",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Hay-Cho-Chung-Toi-Thay-Phan-Manh-Quynh.mp3",
                image: "img/1517194642254_640.jpg"
            },
            {
                name: "Huyền Thoại",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Huyen-Thoai-Phan-Manh-Quynh.mp3",
                image: "img/1547109568814_500.jpg"
            },
            {
                name: "Sao Cha Không - Bố Già OST",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Sao-Cha-Khong-Bo-Gia-OST-Phan-Manh-Quynh.mp3",
                image: "img/f31efb0da9bc984d7246866e6d529d78.jpg"
            },
            {
                name: "Hãy Cho Chúng Tôi Thấy",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Hay-Cho-Chung-Toi-Thay-Phan-Manh-Quynh.mp3",
                image: "img/1517194642254_640.jpg"
            },
            {
                name: "Huyền Thoại",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Huyen-Thoai-Phan-Manh-Quynh.mp3",
                image: "img/1547109568814_500.jpg"
            },
            {
                name: "Sao Cha Không - Bố Già OST",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Sao-Cha-Khong-Bo-Gia-OST-Phan-Manh-Quynh.mp3",
                image: "img/f31efb0da9bc984d7246866e6d529d78.jpg"
            },
        ],

        render: function () {
            const htmls = this.songs.map((song, index) => {
                return (
                    `
                        <div class="song">
                            <div class="thumb">
                                <img class="img-circle" src="${song.image}" alt="">
                            </div>
                            <div class="body">
                                <h3 class="songName">${song.name}</h3>
                                <h5 class="singer">${song.singer}</h5>
                            </div>
                            <div class="options">...</div>
                        </div>
                    `
                );
            });
            playlist.innerHTML = htmls.join("");
        },

        handleEvent: function () {
            _this = this;
            const cdWidth = cd.offsetWidth;
            console.log(cdWidth);
            document.onscroll = function () {
                const scrollTop = document.documentElement.scrollTop || window.scrollY;
                const newCDWidth = cdWidth - scrollTop;
                cd.style.width = newCDWidth + "px";
                cd.style.opacity = newCDWidth/cdWidth;
                console.log(scrollTop);

            }
        },

        start: function () {
            this.render();
            this.handleEvent();
        }
    }
    app.start();
})