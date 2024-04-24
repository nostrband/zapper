import React from 'react'
import { TAB_OPTIONS } from './const'
import { StyledTabItem, StyledTabs } from './styled'

export const Tabs = ({ value, onChange }) => {
   return (
      <StyledTabs value={value} onChange={onChange}>
         {TAB_OPTIONS.map((tab) => {
            return (
               <StyledTabItem
                  key={tab.value}
                  value={tab.value}
                  label={tab.title}
               />
            )
         })}
      </StyledTabs>
   )
}
