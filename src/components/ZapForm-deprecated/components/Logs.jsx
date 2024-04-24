import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

export const Logs = ({ logs }) => {
   const [showLogs, setShowLogs] = useState(false)

   if (!logs) {
      return null
   }
   return (
      <div className="mt-3">
         {!showLogs && (
            <Button
               size="sm"
               variant="outline-secondary"
               onClick={() => setShowLogs(true)}
            >
               View logs
            </Button>
         )}
         {showLogs && <pre>{logs}</pre>}
      </div>
   )
}
