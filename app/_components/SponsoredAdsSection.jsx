import Link from "next/link";
import React, { useState, useEffect } from "react";
import { supabase } from "../_lib/supabase";
import { FaAmazon } from "react-icons/fa";
// Data service function to get all ads
export async function getAllAds() {
  const { data, error } = await supabase
    .from('ads')
    .select('*');

  if (error) {
    console.error("Error fetching ads:", error);
    return [];
  }
  
  return data;
}

// Skeleton loader component for ads
const AdSkeleton = ({ size = "sm" }) => {
  const sizeClasses = {
    sm: "w-full h-96 text-sm",
    md: "w-full h-64 text-sm",
  };

  return (
    <div className={`block bg-white shadow-sm rounded-lg overflow-hidden border border-dashed border-stone-400 ${sizeClasses[size]}`}>
      <div className="w-full h-1/2 bg-gray-200 animate-pulse"></div>
      <div className="p-3 flex flex-col h-1/2">
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const SponsoredAd = ({ size = "md", image, title, link, description, price }) => {
  const sizeClasses = {
    sm: "w-full h-96 text-sm",
    md: "w-full h-64 text-sm",
  };

  return (
    <Link
      href={link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-white shadow-sm rounded-lg overflow-hidden transition transform hover:scale-105 border border-dashed border-stone-400 ${sizeClasses[size]}`}
    >
      <img src={image} alt={title} className="w-full h-1/2 object-contain" />
      <div className="p-3 flex flex-col h-1/2">
        <h3 className="font-bold text-start mb-1 w-full text-xs">{title}</h3>
        <p className="text-gray-600 text-xs mb-2 flex-grow line-clamp-3">{description || "No description available"}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-green-600 font-bold">{price ? `$${price}` : ""}</span>
          <span className="bg-yellow-200 text-xs py-1 px-2 rounded text-gray-800 hover:bg-yellow-500 w-full justify-center flex items-center gap-2 font-semibold ">
          Buy on amazon <FaAmazon/> {price && `• $${price}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

// Client-side component with data fetching
const SponsoredAdsSection = ({ size = "sm" }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAds() {
      try {
        setLoading(true);
        const adsData = await getAllAds();
        setAds(adsData);
      } catch (err) {
        console.error("Failed to fetch ads:", err);
        setError("Failed to load advertisements");
      } finally {
        setLoading(false);
      }
    }

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full justify-between gap-4 my-4">
        {[1, 2, 3].map((index) => (
          <AdSkeleton key={index} size={size} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="w-full text-center py-4 text-red-500">{error}</div>;
  }

  if (!ads || ads.length === 0) {
    return null; // Don't render the section if no ads are available
  }

  return (
    <div className="flex w-full justify-between gap-4 my-4">
      {ads.map((ad) => (
        <SponsoredAd 
          key={ad.id} 
          size={size} 
          image={ad.ads_image || "https://via.placeholder.com/150"} 
          title={ad.ads_title || "Sponsored"} 
          description={ad.ads_description || ""}
          price={ad.ads_price}
          link={ad.aff_ads_link || "#"}
        />
      ))}
    </div>
  );
};

// Server-side component (if using App Router)
export async function ServerSideAdsSection({ size = "sm" }) {
  const ads = await getAllAds();
  
  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full justify-between gap-4 my-4">
      {ads.map((ad) => (
        <SponsoredAd 
          key={ad.id} 
          size={size} 
          image={ad.ads_image || "https://via.placeholder.com/150"} 
          title={ad.ads_title || "Sponsored"} 
          description={ad.ads_description || ""}
          price={ad.ads_price}
          link={ad.aff_ads_link || "#"}
        />
      ))}
    </div>
  );
}

export default SponsoredAdsSection;