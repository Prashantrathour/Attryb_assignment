import React,{ useState } from "react";

function useIdsState() {
    const [ids, setIds] = useState([]);
  
    return [ids, setIds];
  }

  export {useIdsState}