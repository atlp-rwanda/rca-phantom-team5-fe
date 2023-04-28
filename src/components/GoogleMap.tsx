import React from 'react';
import GoogleMapReact from 'google-map-react';

interface GoogleMapProps extends GoogleMapReact.Props {
  children?: React.ReactNode;
}

function GoogleMap({ children, ...props }: GoogleMapProps) {
  return (
    <div className='h-screen w-full'>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: '',
        }}
        {...props}
      >
        {children}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap;
