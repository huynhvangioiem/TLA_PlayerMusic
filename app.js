$(document).ready(function () {
    const get = document.querySelector.bind(document);
    const gets = document.querySelectorAll.bind(document);

    const player = get(".player");
    const playlist = get(".playlist");
    const cd = get(".cd-thumb");
    const songName = get(".header .songName");
    const singer = get(".header .singer");
    const audio = get("#audio");
    const btnPlay = get(".btn-toggle-play");
    const btnRepeat = get(".btn-repeat");
    const btnRandom = get(".btn-random");
    const btnPrev = get(".btn-prev");
    const btnNext = get(".btn-next");
    const progress = get("#progress");

    const app = {
        currentIndex: 0,
        isPlaying: false,
        isRandom: false,
        isRepeat: false,
        config: {},

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
                name: "Có Chàng Trai Viết Lên Cây",
                singer: "Phan Mạnh Quỳnh",
                path: "music/CoChangTraiVietLenCay.mp3",
                image: "img/cochangtraivietlencay.jpg"
            },
            {
                name: "Có Một Nơi Như Thế",
                singer: "Phan Mạnh Quỳnh",
                path: "music/CoMotNoiNhuThe.mp3",
                image: "img/1534302483786_640.jpg"
            },
            {
                name: "Gặp Gỡ, Yêu Đương Và Được Bên Em",
                singer: "Phan Mạnh Quỳnh",
                path: "music/GapGoYeuDuongVaDuocBenEm.mp3",
                image: "img/144473.jpg"
            },
            {
                name: "Nhạt",
                singer: "Phan Mạnh Quỳnh",
                path: "music/Nhat.mp3",
                image: "img/nhat.jpg"
            },
            {
                name: "Nước Ngoài",
                singer: "Phan Mạnh Quỳnh",
                path: "music/NuocNgoai.mp3",
                image: "img/nuocngoai.jpg"
            },
            
            
            
        ],
        setConfig: function(key,value) {
            this.config[key] = value;
        },
        playRandom: function () {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * this.songs.length);
            } while (newIndex === this.currentIndex);
            this.currentIndex = newIndex;
            this.loadCurrentSong();
        },
        nextSong: function () {
            this.currentIndex++;
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0;
            }
            this.loadCurrentSong();
        },
        prevSong: function () {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong();
        },
        // scrollToActiveSong: function () {
        //     setTimeout(() => {
        //         get(".song.active").scrollIntoView({
        //             behavior: "smooth",
        //             block: "nearest"
        //         });
        //     }, 300);
        // },

        //dinh nghia thuoc tinh object
        defineProperties: function () {
            Object.defineProperty(this, "currentSong", {
                get: function () {
                    return this.songs[this.currentIndex];
                }
            })
        },

        //xu ly su kien
        handleEvent: function () {
            _this = this;
            const cdWidth = cd.offsetWidth;

            //xu ly cd phong to thu nho
            document.onscroll = function () {
                const scrollTop = document.documentElement.scrollTop || window.scrollY;
                const newCDWidth = cdWidth - scrollTop;
                cd.style.width = newCDWidth + "px";
                cd.style.opacity = newCDWidth / cdWidth;
            }

            //xu ly cd quay / dung
            const cdAnimate = cd.animate([{ transform: "rotate(360deg)" }], {
                duration: 30000, //10s
                iterations: Infinity
            })
            cdAnimate.pause();


            //khi click btnPlay
            btnPlay.onclick = () => {
                if (_this.isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }

            //khi song isPlaying
            audio.onplay = () => {
                _this.isPlaying = true;
                player.classList.add("playing");
                cdAnimate.play();
            }

            //khi song isPause
            audio.onpause = () => {
                _this.isPlaying = false;
                player.classList.remove("playing");
                cdAnimate.pause();
            }

            //khi tien do bai hat thay doi
            audio.ontimeupdate = () => {
                if (audio.duration) {
                    const progressValue = Math.floor(
                        audio.currentTime / audio.duration * 1000
                    );
                    progress.value = progressValue;
                }
            }

            //tua song
            progress.onchange = (e) => {
               const seekTime = audio.duration / 1000 * e.target.value;
               audio.currentTime = seekTime;
            }

            //next song
            btnNext.onclick = () => {
                if (_this.isRandom) {
                    _this.playRandom();
                } else {
                    _this.nextSong();
                }
                audio.play();
                _this.render();
                // _this.scrollToActiveSong();
            }

            //prev song
            btnPrev.onclick = () => {
                if(_this.isRandom) {
                    _this.playRandom();
                }else{
                    _this.prevSong();
                }
                audio.play();
                _this.render();
                // _this.scrollToActiveSong();
            }

            //random song
            btnRandom.onclick = () => {
                _this.isRandom = !_this.isRandom;
                _this.setConfig("isRandom", _this.isRandom);
                btnRandom.classList.toggle("active", _this.isRandom);
            }

            //repeat song
            btnRepeat.onclick = () => {
                _this.isRepeat = !_this.isRepeat;
                _this.setConfig("isRepeat", _this.isRepeat);
                btnRepeat.classList.toggle("active", _this.isRepeat)
            }

            //auto next song
            audio.onended = () => {
                if(_this.isRepeat){
                    audio.play();
                }else{
                    btnNext.click();
                }
            }

            //playlist on click
            playlist.onclick = (e) => {
                const songNode = e.target.closest(".song:not(.active)");
                if(songNode || e.target.closest(".options")){
                    //click on song
                    if (songNode) {
                        _this.currentIndex = Number(songNode.dataset.index);
                        _this.loadCurrentSong();
                        _this.render();
                        audio.play();
                    }

                    //click on options
                    if(e.target.closest(".options")){
                        //do something
                    }
                }
            }


        },

        loadCurrentSong: function () {
            songName.textContent = this.currentSong.name;
            singer.textContent = this.currentSong.singer;
            cd.src = this.currentSong.image;
            audio.src = this.currentSong.path;
        },

        //render playlist
        render: function () {
            const htmls = this.songs.map((song, index) => {
                return (
                    `
                    <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
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

        start: function () {
            //dinh nghia cac thuoc tinh cho object
            this.defineProperties();

            //Xu ly su kien (DOM Event)
            this.handleEvent();

            //Tai bai hat dau tien
            this.loadCurrentSong();

            //Render playlist
            this.render();

        }
    }
    app.start();
})