import React, { useContext } from 'react'
import { Context } from '../context/Context'
import FoodItem from './FoodItem'

const FoodCatalog = ({category}) => {

    const {food_list} = useContext(Context)

    // console.log(food_list);

    // const shuffleArray = (array) => {
    //     const shuffledArray = [...array];
    //     for (let i = shuffledArray.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    //     }
    //     return shuffledArray;
    // }
    
        

  return (
    <div className='px-6 sm:px-12 md:px-16 lg:px-14 xl:px-32'>
        <h2 className='text-dark-coffee text-4xl font-bold my-16 py-2 text-center lg:text-left'> 
            Best Bites
        </h2>
        <div className='grid place-items-center xl:grid-cols-4 lg:grid-cols-3 xs:grid-cols-2 grid-cols-1 md:gap-4 lg:gap-6 xl:gap-8'>
            
            {/* {
                food_list && 
                // food_list.sort(() => Math.random() - 0.5).map()
                food_list.sort(() => Math.random() - 0.5).map((item, index) => {
                    // console.log(category, item.category);
                    // item.category has all categories. now if category=all display all items and if category is selected to one specific category then display only those category items
                    if (category === "All" || category === item.category) {                        
                       return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.foodImage} tag={item.tags}/>
                    }
                })
            } */}
            {
                food_list && 
                // shuffleArray(food_list)
                food_list
                .filter(item => category === "All" || category === item.category) // Filter the items based on the selected category
                .map(item => (
                <FoodItem 
                    key={item._id} // Use a unique key
                    id={item._id} 
                    name={item.name} 
                    description={item.description} 
                    price={item.price} 
                    image={item.image} 
                    // tag={item.tags}
                />
                ))
            }

        </div>
    </div>
  )
}

export default FoodCatalog