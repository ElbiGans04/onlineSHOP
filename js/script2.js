$(document).ready(function(){
    $.ajax({
        url : '../data.json',
        success : result => {
            let target = result[0];
            $('#nama').html(target.nama_produk);
            $('#merek').html(target.merek);  
            $('#kategori').html(target.kategori);         
            $('#deskripsi').html(target.deskripsi);

            if(target.discount == null){ 
                $('#harga').html(`<p class="h5 text-dark" style="opacity:.9">${formatRupiah(target.harga , "Rp.")}</p>` );
            }else {
                $('#harga').html(
                    `<p class="text-danger h5">${diskon(target.harga,target.discount)}</p>
                    <p class="text-dark d-inline" style="text-decoration: line-through;font-size:15px">${formatRupiah(target.harga , "Rp.")}</p>
                    <div class="badge badge-danger text-wrap mt-1" style="width: 5rem; ">${target.discount}%</div>`
                );
            }

    

            //lopping warna
            $.each($('.warnaImg') , function(index,value){
                $(this).attr('src' ,'img/' + target['warna'][`${index + 1}`]['src']);
                $(this).attr('warna' , target['warna'][`${index + 1}`]['warna']);
            })


            target["ukuran"].forEach(function(e){
                $('#ukuran').append(`<span class="itemUkuran mr-1">${e}</span>`)
            })
        
            //itemGambar
            for(const l in target["warna"]){
                $('#warna').append(`<img src="img/${target["warna"][l]["src"]}" alt="satu" class="warnaImg mr-1" data-target="${target["warna"][l]["warna"]}">`);
                $('#listGambarUtama').append(`<img src="img/${target["warna"][l]["src"]}" alt="satu" class="itemGambar mr-1"">`);
            }
            $('.warnaImg').first().addClass('active');
            $('.itemGambar').first().addClass('active');



            
            clickGambar('.warnaImg' ,  '#judulWarna' , 'active' ,'no');
            clickGambar('.itemUkuran' , 'judul' , 'active' , 'no' );
            clickGambar('.itemGambar' , '#utama' , 'active' , 'yes');
            event('#next' , '#utama' , 'itemGambar active' , '.itemGambar' , 'active');
            event('#previous' , '#utama' , 'itemGambar active' , '.itemGambar' , 'active');
            //awal share
            let shareButton = document.getElementById('share');
            shareButton.addEventListener('click' , function(e){
                e.target.setAttribute('data-target' , '#exampleModalCenter');
                e.target.setAttribute('data-toggle' , "modal")
            })

            // Awal Smoth Scrooling
            
            
            $(document).ready(function(){
                $('.page-scroll').on('click' , function(e){
                    const tujuan = $(this).attr('href');
                    const elementTujuan = $(tujuan);
                    $('html , body').animate({
                        scrollTop :  elementTujuan.offset().top - 70
                    })
                    e.preventDefault()
                });
            })
            
            // Akhir Smoth Scrolling
            
            
            
            
                
                
                jumlah('jumlahTambah' , 'jumlahKurang' , 'jumlahHasil' , 1 , 2)
                
                
                let isi = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente esse, tempora vel eligendi consequatur laudantium, eveniet eum nisi magnam laboriosam non ipsa enim molestiae magni, dicta quidem architecto veritatis voluptas.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati, maxime in quaerat, itaque praesentium fugit magnam nam quas ratione sequi reiciendis corporis quod est eos possimus quibusdam sed iusto alias?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi laborum cumque a qui rem ipsam maxime sed modi corporis delectus labore saepe sequi vero, pariatur eligendi velit. Velit, consequuntur. Quam!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident optio eveniet perspiciatis natus voluptatibus dolore sapiente incidunt? Dolorem quos ea ipsam excepturi tempora, eius veritatis, unde, illum ad architecto totam!
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit nostrum ipsa quod minima alias libero quia dolore animi. Laboriosam voluptatem architecto cupiditate modi accusantium at repudiandae, provident fugiat. At, alias?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis temporibus, voluptates porro asperiores totam veniam fugit explicabo quia ut et atque provident laboriosam, facere dolorem obcaecati recusandae omnis nisi doloribus?
                `;
                
                komentar('isiKomentar' , isi ,1000);
                komentar('balasKomentar' , isi , 1000);
                likeDislike('likeKomentar' , 'dislikeKomentar' , 'jumlahLikeKomentar')
            
            
            
            
            
            // Function 
            
            function event(a,b,c,d,tipe){
                let target = document.querySelector(a);
                target.addEventListener('click' , function(e){
                    e.preventDefault();
                    let sumber = document.getElementsByClassName(c)[0];
                    console.log(c)
                    let itemGambar = document.querySelectorAll(d);
                    let target = document.querySelector(b);
                    sumber.classList.remove(tipe);
                    $('.img-zoom').remove();
                    
            
                    
                    if(a == '#next'){ 
                        if(sumber.nextElementSibling == null){
                            itemGambar[0].classList.add(tipe);
                            target.src = itemGambar[0].src;
                            imageZoom('utama' , 'result');
                            return 
                        };
                        sumber.nextElementSibling.classList.add(tipe);
                        target.src = sumber.nextElementSibling.src;
                        imageZoom('utama' , 'result');
                        return };
            
                    //jika previous
                    if(sumber.previousElementSibling == null){
                        itemGambar[itemGambar.length - 1].classList.add(tipe);
                        target.src = itemGambar[itemGambar.length - 1].src;
                        imageZoom('utama' , 'result');
                        return
                    };
                    sumber.previousElementSibling.classList.add(tipe);
                    target.src = sumber.previousElementSibling.src;
                    imageZoom('utama' , 'result');
                    
                })
            };
            
            
            
            
            function clickGambar(a,b,c,d){
                let elementA = document.querySelectorAll(a);
                elementA.forEach(function(a){
                    a.addEventListener('click' , function(e){
                        elementA.forEach(z => z.classList.remove(c));
                        e.target.classList.add(c);
                        $('.img-zoom').remove();
                        if(d === 'yes'){
                            let elementB = document.querySelector(b);
                            elementB.src = e.target.src;
                            imageZoom('utama' , 'result');
                            return
                        }
            
                        if(e.target.getAttribute('data-target')){
                            let elementB = document.querySelector(b);
                            elementB.innerHTML = e.target.getAttribute('data-target');
                            imageZoom('utama' , 'result');
                            return
                        }
            
                    })
                })
            }
            
            
            
            function jumlah(a,b,c,d,e){
                let tambah = document.getElementById(a);
                let kurang = document.getElementById(b);
                let hasil = document.getElementById(c);
                let ko = parseInt(hasil.textContent);
                
            
                tambah.addEventListener('click' , function(){
                    if(ko >= e){
                        hasil.textContent = e;
                        return
                    }
                    ko++;
                    hasil.textContent = ko;
                });
            
                kurang.addEventListener("click" , function(){
                    if(ko <= d){
                        hasil.textContent = d;
                        return
                    }
                    ko--;
                    hasil.textContent = ko;
                })
            
            
            }
            
            
            function komentar(a,b,c){
                let balas = document.getElementById(a);
                balas.innerHTML = b.substring(0,c);
                if(isi.length > c) {
                    balas.innerHTML +=  `  <a href="#" id="lihatSelengkapnya">Lihat Selengkapnya</a>`;
                }
                
                document.addEventListener('click' , function(e){
                    e.preventDefault();
                    if(e.target.id == 'lihatSelengkapnya'){
                        balas.innerHTML = b;
                        balas.innerHTML += `<a href="#" id="sembunyikanKomentar">Sembunyikan</a>`
                    }
                })  
            
                document.addEventListener('click' , function(e){
                    e.preventDefault();
                    if(e.target.id == 'sembunyikanKomentar'){
                        balas.innerHTML = b.substring(0,800);
                        balas.innerHTML +=  `  <a href="#" id="lihatSelengkapnya">Lihat Selengkapnya</a>`;
                    }
                })
            }
            
            
            
            
            function likeDislike(a,b,c) {
                let like = document.getElementById(a);
                let dislike = document.getElementById(b);
                let jumlah = document.getElementById(c);
                angkaJumlah = parseInt(jumlah.textContent);
                
                
            
                like.addEventListener('click' , function(e){
                    angkaJumlah++
                    if(angkaJumlah <= 1){
                        jumlah.textContent = angkaJumlah;
                        console.log("Fael")
                        e.target.src = 'img/likeActive.jpg';
                        return
                    }   
                });
            
            
            
            }
            
            
            inputBalas('balasKomentarInput' , 'inputBalasKomentar')
            function inputBalas(a,b){
                let balas = document.getElementById(a);
                let input = document.getElementById(b);
                balas.addEventListener('click' , function(e){
                    e.target.remove();
                    input.removeAttribute('style')
                })
            }
            
            
            function diskon(hargaAwal,diskon){
                var diskon;
                diskon = diskon * hargaAwal;
                hargaDiskon = hargaAwal - diskon;
            
                return formatRupiah(hargaDiskon + '' , 'Rp.');
            }
            
            
            
            function formatRupiah(angka, prefix){
                var number_string = angka.replace(/[^,\d]/g, '').toString(),
                split   		= number_string.split(','),
                sisa     		= split[0].length % 3,
                rupiah     		= split[0].substr(0, sisa),
                ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
            
                // tambahkan titik jika yang di input sudah menjadi angka ribuan
                if(ribuan){
                    separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                }
            
                rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
                return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
            }
            
            
            imageZoom('utama' , 'result');
            function imageZoom(image,result,kondisi){
                let img = document.getElementById(image);
                let hasil = document.getElementById(result);
                
                let lens = document.createElement('div');
                lens.classList.add('img-zoom');
                img.parentElement.insertBefore(lens , img);
            
                let cx = img.offsetWidth / lens.offsetWidth;
                let cy = img.offsetHeight / lens.offsetHeight;
                
                hasil.style.backgroundImage = `url('${img.src}')`;
                hasil.style.width = `${img.offsetWidth}px`;
                hasil.style.height = `${img.offsetHeight}px`;
                hasil.style.backgroundSize = `${img.offsetWidth * cx}px ${img.offsetHeight * cy}px`;
            
            
                
                lens.addEventListener("mousemove", cursor);
                img.addEventListener("mousemove", cursor);
                lens.addEventListener("mouseleave", exit);
                img.addEventListener("mouseleave", exit);
            
                /* And also for touch screens: */
                lens.addEventListener("touchmove", cursor);
                img.addEventListener("touchmove", cursor);
                lens.addEventListener("touchleave", exit);
                img.addEventListener("touchleave", exit);
                
            
            
                function exit(){
                    hasil.style.display = 'none';
                }
            
                function cursor(e){
                    let pos , x, y;
                    pos = notExit(e);
                    x = pos.x - (lens.offsetWidth / 2);
                    y = pos.y - (lens.offsetHeight / 2);
                    
            
                if (x > img.width - lens.offsetWidth) {x = (img.width - lens.offsetWidth);}
                if (x < 0) {x = 0;}
                if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
                if (y < 0) {y = 0;}
            
                
                
                if($('.img-zoom').length == 0){
                    return 
                }
                
                hasil.style.display = 'inline-block'
                lens.style.left = x + "px";
                lens.style.top = y + "px";
                /* Display what the lens "sees": */
                hasil.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy ) + "px";
            };
            
                function notExit(e){
                    let x = 0;
                    let y = 0;
                    let a = img.getBoundingClientRect();
            
                    x = e.pageX - a.left;
                    y = e.pageY - a.top;
                    
                    x = x - window.pageXOffset;
                    y = y - window.pageYOffset;
                return {x,y}   
                }
            
            
                
            }           
            

        
             
        }
    })
});


