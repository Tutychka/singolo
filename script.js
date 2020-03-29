const anchors = document.querySelectorAll('a[href^="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const linkActive = document.querySelector('a[class="active"]');
    linkActive.classList.remove('active');
    anchor.classList.add('active');
    const blockID = anchor.getAttribute('href').substr(1)
    document.querySelector('a[name='+blockID+']').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// sliders

function multiItemSlider() {
  let
    mainElement = document.querySelector('.slider'), // основный элемент блока
    sliderWrapper = mainElement.querySelector('.slider__wrapper'), // обертка для слайдеров
    sliderItems = mainElement.querySelectorAll('.slider__item'), // слайды (.slider-item) 
    positionLeftItem = 0, // позиция активного слайда
    step = 1020, // величина шага, насколько сдвигаем слайды (для трансформации)
    transform = 0, // значение транфсофрмации .sliderwrapper, рассчитывается с помощью step
    items = [] // массив элементов

  // перебираем слайды, наполняем массив items обьектами
  sliderItems.forEach(function (item, index) {
    items.push({ item: item, position: index, transform: 0 });
  });

  // методы для расчета минимальных/максимальных позиций слайдов в цепочке слайдов
  let position = {
    getItemMin: function () {
      let indexItem = 0;
      items.forEach(function (item, index) {
        if (item.position < items[indexItem].position) {
          indexItem = index;
        }
      });
      return indexItem;
    },
    getItemMax: function () {
      let indexItem = 0;
      items.forEach(function (item, index) {
        if (item.position > items[indexItem].position) {
          indexItem = index;
        }
      });
      return indexItem;
    },
    getMin: function () {
      return items[position.getItemMin()].position;
    },
    getMax: function () {
      return items[position.getItemMax()].position;
    }
  }

  // метод для сдвига слайдов
  let transformItem = function (direction) {
    let nextItem;
    if (direction === 'right') {
      positionLeftItem++;
      //если дошли до конца слайдов, то переставляем предварительно самый первый слайд вправо
      if (positionLeftItem > position.getMax()) {
        nextItem = position.getItemMin();
        items[nextItem].position = position.getMax() + 1;
        items[nextItem].transform += items.length * 1020;
        items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + 'px)';
      }
      //высчитываем, насколько сдвинуть враппер влево
      transform -= step;
    }
    if (direction === 'left') {
      positionLeftItem--;
      //если дошли до начала слайдов, то переставляем предварительно самый последний слайд влево
      if (positionLeftItem < position.getMin()) {
        nextItem = position.getItemMax();
        items[nextItem].position = position.getMin() - 1;
        items[nextItem].transform -= items.length * 1020;
        items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + 'px)';
      }
      //высчитываем, насколько сдвинуть враппер вправо
      transform += step;
    }
    //сдвигаем враппер
    sliderWrapper.style.transform = 'translateX(' + transform + 'px)';
  }

  //функция-обработчик события click для кнопок "вправо" и "влево"
  let controlClick = function (e) {
    //если кликнули на кнопку, содержащую класс slider__control
    if (e.target.classList.contains('slider__control')) {
      e.preventDefault();
      //определяем направление кнопки
      let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
      //вызываем метод сдвига слайда, передаем ему направление сдвига
      transformItem(direction);
    }
  };

  //вешаем обработчик на клик по слайдеру
  mainElement.addEventListener('click', controlClick);
}

multiItemSlider()

// display

const displayChange= document.querySelectorAll('.phone_section img')
for (let i of displayChange){
i.addEventListener('click', function (e){
  debugger;
const pathName = e.path[1].className;
  const colorPhone = document.querySelector('.' +pathName + ' .phone');
  const displays = colorPhone.style.display
    if (displays === 'none'){
      colorPhone.style.display = "";
    }
    if (displays === ""){
      colorPhone.style.display = 'none';
    }
})
}

