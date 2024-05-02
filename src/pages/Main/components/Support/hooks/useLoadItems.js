import { useEffect, useState } from 'react'
import { getPrismById } from '../utils/data'

export const useLoadItems = (id) => {
   const [isLoading, setIsLoading] = useState(false)
   const [items, setItems] = useState([])

   useEffect(() => {
      const load = async () => {
         try {
            setIsLoading(true)
            const developers = await getPrismById(id)
            setIsLoading(false)
            setItems(developers)
         } catch (error) {
            setIsLoading(false)
         }
      }
      load()
   }, [])

   return [items, isLoading]
}
