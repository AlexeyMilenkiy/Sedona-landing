window.onload = function(){

   let slides = document.querySelectorAll('.slide-single');
   let next = document.querySelector('#next-slide');
   let previous = document.querySelector('#prev-slide');
   let slider = [];

   for (let i=0; i< slides.length; i++){
   	slider[i] = slides[i].src;   // присвоение атрибута, добавляем путь к нашей картинке
   	slides[i].remove();  // удаление картинок со страницы
   }
   console.log(slider); // остался только массив путей

   let step = 0; // определяет какую картинку показывать в основном блоке
   let offset = 0; // смещение картинки
   
   // функция отрисовки изображения

   function showImage(){
   	    let img = document.createElement('img'); // создание картинки
   	    img.src = slider[step]; // присвоение пути каждой новой картинке 
   	    img.classList.add('slide-single'); // добавляем картинке класс
   	    img.style.left = offset * 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
   	    document.querySelector('.slider').appendChild(img); // добавляем картинку в наш блок
        if(step + 1 === slider.length){   
        	step = 0;
        }
        else{
        	step++;
        }
        offset = 1;
   }

   function left(){
   	    document.onclick = null;
   	    let slides2 = document.querySelectorAll('.slide-single');
   	    let offset2 = 0;

   	    for(let i=0; i<slides2.length; i++){
   	    	slides2[i].style.left = offset2 * 806 - 806 + 'px';
   	    	offset2++;
   	    }
   	       setTimeout(function(){
   	           
   	           showImage();
   	           slides2[0].remove();
   	           document.onclick = left;
   	       }, 3000);
   }

      function right(){
   	    document.onclick = null;
   	    let slides2 = document.querySelectorAll('.slide-single');
   	    let offset2 = 0;

   	    for(let i=0; i<slides2.length; i++){
   	    	slides2[i].style.right = offset2 * 806 + 806 + 'px';
   	    	offset2++;
   	    }
   	       setTimeout(function(){
   	           slides2[0].remove();
   	           showImage();
   	           document.onclick = right;
   	       }, 3000);
   }
   next.onclick = left;
   previous.onclick  = right;
   
   showImage();showImage();
}

// $(document).ready(function(){

// 	Slider(20);


// 	function Slider(margin) {

// 		// html var
// 		var sliderContainer = $('#slider');
// 		var sliderInner = $(sliderContainer).find('.slider-inner');
// 		var item = $(sliderInner).find('.item');
// 		var itemShow = 4; // Сколько показывать 4
// 		var pagination = $(sliderContainer).find('.pagination');

// 		// Head var
// 		var itemL = item.length; // Количество  12
// 		var sliderInnerWidth = sliderInner.width(); // 1170
// 		var sliderWrapper = $(sliderInner).find('.slider-wrapper'); 


// 		// Item Width 
// 		var itemW = (sliderInnerWidth - ((margin * 2) * itemShow)  ) / itemShow; //252


// 		// Wrapper width
// 		var sliderWrapperWidth =  itemL * ( itemW + (margin * 2)); // 3510

// 		// Максимальное значение шага
// 		var nextMax = sliderWrapperWidth - sliderInnerWidth;
// 		nextMax = nextMax * (-1);
// 		var td = 0;
// 		var step;

// 		$('.prev').click(function(){

// 			if (td == 0) {
// 				return false;
// 			}
// 			else {
// 				step = itemW + (margin * 2);
// 				td += step
// 				$('.slider-wrapper').css({
// 					'transform' : 'translate3d(' + td + 'px, 0px, 0px)'
// 				});
// 				console.log(td);
// 			}
// 		});
// 		$('.next').click(function(){
			
// 			if(nextMax == td) {
// 				return false
// 			}
// 			else {
// 				step = itemW + (margin * 2);

// 				td -= step
// 				$('.slider-wrapper').css({
// 					'transform' : 'translate3d(' + td + 'px, 0px, 0px)'
// 				});
// 				console.log(td);
// 			}
// 		});

// 		$(sliderWrapper).css({
// 			'width': sliderWrapperWidth + 'px'
// 		});

// 		$(item).css({
// 			'width' : itemW + 'px',
// 			'margin' : margin + 'px'
// 		});


// 	};

// });


