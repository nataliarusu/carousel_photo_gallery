
const gallery = document.querySelector('.gallery');
const images = [
  { src: './images/bridge.jpg', alt: 'bridge', id: '1' },
  { src:'./images/buckingham-palace.jpg', alt:'buckingham-palace', id:'2'},
  { src: './images/bus.jpg', alt: 'bus', id: '3' },
  { src: './images/London-CBD.jpg', alt: 'London-CBD', id: '4' },
  { src: './images/london-eye.jpg', alt: 'London-eye', id: '5' },
  { src: './images/telephone.jpg', alt: 'telephone', id: '6' },
  { src: './images/Castle-Combe-UK.jpg', alt: 'Castle-Combe', id: '7' },
  { src: './images/Jurassic-Coast.jpg', alt: 'Jurassic-Coast', id: '8' },
  {src:'./images/windsor.jpg', alt:'Windsor', id:'9'}
];

const backdrop = document.querySelector('.backdrop ');
const modal = document.querySelector('.modal');
const largeImageContainer = document.querySelector('.modal-image-container');
const modalImages = document.querySelectorAll('.modal-image-container img');
const arrowsContainer = document.querySelector('.arrows-containter');
const closeBtn = document.querySelector('#close');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
//
const maxContainerWidth=768;
let count=0;

console.log(largeImageContainer.clientHeight);


let containerSize = ()=>{ 
  const w = document.documentElement.clientWidth;  
  return w>maxContainerWidth?maxContainerWidth:w;//largeImageContainer.clientWidth;
}

const changedWindowsSizeHandler=()=>{
  
  largeImageContainer.style.transform = 'translateX(' + -containerSize() * count + 'px)';
  arrowsContainer.style.height = largeImageContainer.clientHeight+'px';
}

const nextEventHandler = () => {
  
  if (count < modalImages.length - 1){
    count++;
    modalImages[count - 1].classList.remove('current-slide');
    
  } else{
    count = 0;
    modalImages[modalImages.length - 1].classList.remove('current-slide');
  }
 
  largeImageContainer.style.transform = 'translateX(' + -containerSize() * count + 'px)';
  modalImages[count].classList.add('current-slide');
};



const prevEventHandler = () => {
  
  if (count !==0){  
    count--;
    modalImages[count].classList.remove('current-slide');   
    
  } else{
    count=modalImages.length - 1;
    modalImages[modalImages.length - 1].classList.remove('current-slide');
  }
  
  largeImageContainer.style.transform = 'translateX(' + -containerSize() * count + 'px)';
  modalImages[count].classList.add('current-slide');
};





const closeModal=()=>{
  modal.classList.remove('visible');
  backdrop.classList.remove('visible');
  
}

const largeImgRenderHandler=(ev)=>{
  backdrop.classList.add('visible');
  const arrayOfImages = Array.from(modalImages);


  const elIdx = arrayOfImages.findIndex(el => el.id === ev.target.id);//to be able to use find()
  modal.classList.add('visible');

  count=elIdx;//reasign count to be equal to the clicked element position in nodelist
  const containerS = containerSize();
  console.log(containerS)
  modalImages[count].classList.add('current-slide');//add class to that image

  largeImageContainer.style.transform = 'translateX(' + -containerS * count + 'px)';//transform to img that was clicked
  arrowsContainer.style.height = largeImageContainer.clientHeight+'px';
}
/*gallery*/
const createHTMLel=(elPropsObj, htmlEL)=>{
  const HTMLel = document.createElement(`${htmlEL}`);
  for(const propety in elPropsObj){//obj
      HTMLel.setAttribute(propety, elPropsObj[propety]);
  }
  return HTMLel;
}

const renderGallery = () => {
    
  const ul = document.createElement('ul');
  ul.classList.add('gallery--list');

  for (const imgObj of images) {//arr
    const li = document.createElement('li');
    li.classList.add('gallery--list-item');
    const img = createHTMLel(imgObj, 'img');
    li.append(img);
    ul.append(li);
  }
  gallery.append(ul);
  ul.addEventListener('click', largeImgRenderHandler);
};

const hideBackdropHandler=()=>{
  backdrop.classList.remove('visible');

}
renderGallery();
closeBtn .addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
prevBtn.addEventListener('click', prevEventHandler);
nextBtn.addEventListener('click', nextEventHandler);
window.addEventListener("resize", changedWindowsSizeHandler);

