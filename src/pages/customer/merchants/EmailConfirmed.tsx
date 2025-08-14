import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { vendorEmailVerification } from "@api"; 
import { useEffect } from "react";

const EmailConfirmed = () => {
  const {code} = useParams();
  
  const { data } = useQuery({
    queryKey: ["vendor-email-verification", code],
    queryFn: () => vendorEmailVerification(code)
  })
  
  return (
    <div className="py-6 text-center text-xl font-bold">
      <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
      
      <div style={{
        width: "35%"
      }}
        className="m-auto text-gray-800"
      >
        {data?.message}
      </div>
    </div>
  )
}

export default EmailConfirmed;