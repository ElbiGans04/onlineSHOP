const utama = document.getElementById('utama');
// let nilai = 1;
// let nilai2 = 1;
// setInterval(function(){
//     nilai2 = nilai2 + 1 ;
//     if(nilai2 > 6){
//         nilai2 = 1;
//     };
//     utama.setAttribute("src" , `img/${nilai2}.jpg`);
// },2000)
// $('#left').on('click' , function(){
//     if(nilai <= 2){
//         nilai = 6;
//     };
//     utama.setAttribute("src" , `img/${nilai--}.jpg`);

// })
// $('#right').on('click' , function(){
//     if(nilai > 6){
//         nilai = 1;
//     }
//     utama.setAttribute("src" , `img/${nilai++}.jpg`);
// })


// $(document).on('click' ,function(e){
//     if(e.target.id == "left"){
//         nilai = nilai- 1 ;
//         if(nilai < 1){
//             nilai = 6;};
//         utama.setAttribute("src" , `img/${nilai}.jpg`);
//     }

//     if(e.target.id == "right"){
//         nilai = nilai + 1 ;
//         if(nilai > 6){
//             nilai = 1;
//         };
//         utama.setAttribute("src" , `img/${nilai}.jpg`);
//     }
// })










// function hello(){
//     let nilai = 1;
//     return function(){
//         return nilai = nilai + 1;
//     }
// }


$.ajax({
    url : "../warna.json",
    success : result => {
        let target = result[0]["warna"];
        for(let i in  target){
            if(i == 0){
                $('#gambarUtama').append(`<img src="img/${target[i]}" alt="gambar utama" id="utama" class="gambarUtama d-inline" data-target = "${parseInt(i)+1}" >`);
                $('#list').append(`<div class="activeList" data-target = "${parseInt(i)+1}"></div>`)
                
            }else {
                $('#gambarUtama').append(`<img src="img/${target[i]}" alt="gambar utama" class="gambarUtama d-none" data-target = "${parseInt(i)+1}" >`);
                $('#list').append(`<div class="notActiveList ml-2" data-target = "${parseInt(i)+1}"></div>`)
            }

        }


        
    }
})


setInterval(function(){
    if($('.gambarUtama.d-inline').next().length !== 0){
        $('.gambarUtama.d-inline').removeClass('d-inline').addClass('d-none').next().removeClass('d-none').addClass('d-inline');
        let type = $('.gambarUtama.d-inline').data('target');
        $('#list div').addClass('notActiveList').removeClass('activeList');
        $(`#list [data-target = ${type}]`).removeClass('notActiveList').addClass('activeList');
        return
    }

    $('.gambarUtama').last().removeClass('d-inline').addClass('d-none')
    $('.gambarUtama.d-none').first().removeClass('d-none').addClass('d-inline')
    $('#list div').addClass('notActiveList').removeClass('activeList');
    $('#list div').first().removeClass('notActiveList').addClass('activeList')
},2000)





//smoth scroll
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

// akhir smoth scroll







//membuat colldown timer
const waktuNanti = new Date("June 27, 2020 23:00:00").getTime();

setInterval(function(){
    //ambil waktu sekarang
    const waktu = new Date().getTime();
    const jumlah = waktuNanti - waktu ;


    //jumlahkan
    var days = Math.floor(jumlah / (1000 * 60 * 60 * 24));
    var hours = Math.floor((jumlah % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((jumlah % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((jumlah % (1000 * 60)) / 1000);

    $('.zero').html(days + ' Hari');
    $('.one').html(hours + ' Jam');
    $('.two').html(minutes + ' Menit');
    $('.three').html(seconds + 'Detik');
},1000)

//akhir


// Bagian
$(document).ready(function(){
    $.ajax({
        url : '../data.json',
        success : a => {
            a.forEach(e => {
                $('.target').append(
                    `<div class="col-sm-3">
                    <div class="card mt-3" style= "min-height: 441px;">
                        <a href="detail.html" class="text-decoration-none text-dark" >
                        <img src="img/${e.img}" class="card-img-top" alt="...">
                        <ul class="list-group list-group-flush ">
                            <li class="list-group-item">
                                <p class="h4 mb-3">${e.nama_produk}</p>
                                ${ e.discount !== null ? `<p class="text-danger h5">${diskon(e.harga,e.discount)}</p>
                                <p class="text-dark d-inline" style="text-decoration: line-through;font-size:15px">${formatRupiah(e.harga)}</p>
                                <div class="badge badge-danger text-wrap mt-1" style="width: 5rem; ">${e.discount}%</div>`

                                 :  `<p class="h5 text-dark" style="opacity:.9">${formatRupiah(e.harga)}</p>`}
                            </li>
                            <li class="list-group-item">
                            <p style = "font-size:15px ; opacity:.8" >${e.kategori}</p>
                            </li>
                        </ul>
                        </a>
                    </div>`
                    )
            })
        },

        error : e => $('body').html("Error 404 ")

    })
})
// Akhir bagian
function diskon(hargaAwal,diskon){
    diskon = diskon / 100;
    hargaAwal = parseInt(hargaAwal);
    let result = hargaAwal * diskon;
    return formatRupiah(result);
}



function formatRupiah(hargaDiskon){
    var	number_string = hargaDiskon.toString(),
	sisa 	= number_string.length % 3,
	rupiah 	= number_string.substr(0, sisa),
	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
		
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }


    return 'Rp.' + rupiah;
}


