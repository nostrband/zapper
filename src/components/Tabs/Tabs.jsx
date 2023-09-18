import React from 'react'

export const Tabs = ({ tabs, onTabChange, activeTab }) => {
   const getAnchorClassName = (tab) => (activeTab === tab.value ? 'active' : '')

   return (
      <ul className="nav nav-pills mb-3">
         {tabs.map((tab) => {
            return (
               <li key={tab.value} className="nav-item">
                  <a
                     className={`nav-link ${getAnchorClassName(tab)}`}
                     href="/"
                     onClick={(e) => {
                        e.preventDefault()
                        onTabChange(tab.value)
                     }}
                  >
                     {tab.title}
                  </a>
               </li>
            )
         })}
      </ul>
   )
}
