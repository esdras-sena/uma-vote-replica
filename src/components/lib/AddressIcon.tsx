import { useAccount, useStarkProfile } from "@starknet-react/core";
import { useState } from "react";
import { blo } from 'blo';

const AddressBar = () => {
  const { address } = useAccount();
  const { data: starkProfile } = useStarkProfile({ address });
  const [imageError, setImageError] = useState(false);
  
  if (!address) {
    return null;
  }

  return (
    <span className="flex items-center">
      {!imageError && starkProfile?.profilePicture ? (
        <img
          src={starkProfile.profilePicture}
          className="mr-2 h-6 w-6 rounded-full"
          alt="starknet profile"
          onError={() => setImageError(true)}
        />
      ) : (
        <img 
          src={blo(address as `0x${string}`)} 
          className="mr-2 h-6 w-6 rounded-full" 
          alt="address avatar" 
        />
      )}
      {starkProfile?.name
        ? starkProfile.name
        : address?.slice(0, 6).concat("...").concat(address?.slice(-4))}
    </span>
  );
};

export default AddressBar;
