
const ratingArray = document.querySelectorAll('.rating-half');
for (const eachRating of ratingArray) {
    const ratingValue = Number(eachRating.getAttribute('data-rating'))
    const ratingFloor = Math.floor(ratingValue);
    console.log(ratingFloor)
    const ratingOr = (ratingFloor - ratingFloor) * 10 > 8 ? 2 : 1;

    const ratingArr = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'lime', 'lime', 'green', 'green']
    console.log(ratingOr)

    const ParentDiv = document.createElement('div')
    ParentDiv.className = "rating rating-xs rating-half"

    for (let index = 0; index < 10; index++) {

        const childElement = document.createElement('input')
        childElement.type = 'radio';
        childElement.disabled = true;
        childElement.style.cursor = 'default';
        
        childElement.className = (index % 2 == 0 ? 'mask-half-1' : 'mask-half-2') + " mask  mask-star-2 "
        childElement.style.backgroundColor = (((ratingFloor * 2) + ratingOr - 1) >= index ? ratingArr[index] : '')
        ParentDiv.appendChild(childElement)
    }
    eachRating.appendChild(ParentDiv)

}

// const ratingArray = document.querySelectorAll('.rating-half');
// for (const eachRating of ratingArray) {
//     const ratingValue = Number(eachRating.getAttribute('data-rating'))
//     const ratingFloor = Math.floor(ratingValue);
//     console.log(ratingFloor)
//     const ratingOr = (ratingFloor - ratingFloor) * 10 > 8 ? 2 : 1;

//     const ratingArr = ['red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'lime', 'lime', 'green', 'green']
//     console.log(ratingOr)

//     const ParentDiv = document.createElement('div')
//     ParentDiv.className = "rating rating-xs rating-half"

//     for (let index = 0; index < 10; index++) {

//         const childElement = document.createElement('input')
//         childElement.type = 'radio';
//         childElement.disabled = true;
//         childElement.style.cursor = 'default';
        
//         childElement.className = (index % 2 == 0 ? 'mask-half-1' : 'mask-half-2') + " mask  mask-star-2 "
//         childElement.style.backgroundColor = (((ratingFloor * 2) + ratingOr - 1) >= index ? ratingArr[index] : '')
//         ParentDiv.appendChild(childElement)
//     }
//     eachRating.appendChild(ParentDiv)

// }
