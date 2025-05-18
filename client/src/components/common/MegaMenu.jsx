import Link from 'next/link';
import React from 'react';

const menus = [
  {
    name: "READY TO SHIP",
    path: "/"
  },
  {
    name: "BEST SELLERS",
    path: "/"
  },
  {
    name: "SALE",
    path: "/"
  },
];

const generateSlug = (name) => {
  return name
    .toLowerCase()                    // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, '')     // Remove special characters
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .replace(/-+/g, '-');             // Replace multiple hyphens with a single hyphen
};


const MegaMenu = ({ categories }) => {

  const groupedCategories = categories
  .filter(category => category.group)  // Only include categories with a 'group' property
  .reduce((acc, category) => {
    // Group by 'group' field
    if (!acc[category.group]) {
      acc[category.group] = [];
    }
    acc[category.group].push(category);
    return acc;
  }, {});

console.log(groupedCategories);

  return (
    <div className="absolute top-[50px] left-0 w-screen bg-white shadow-lg z-30 overflow-hidden">
      {/* <div className="w-full max-w-[1500px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {categories.map((category, idx) => (
          <div key={idx} className={category.featured ? "col-span-1 bg-gray-50 p-4" : "col-span-1"}>
            {category.title && (
              <h3 className=" text-[13px] font-bold text-[#001D3DBF] mb-4">{category.title}</h3>
            )}
            <ul className="space-y-2">
              {category.items.map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-[13px] text-gray-600 hover:text-primary hover:underline transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
      <div className="w-full max-w-[1500px] mx-auto p-12">
        <div className='flex'>
          <ul className='w-full max-w-[200px] mr-10 border-r border-primary/75'>
            {
              menus?.map((item, index) => (
                <li key={index} className='pb-1'>
                  <Link href={`/collection/${generateSlug(item.name)}`} className='text-primary/75 hover:text-primary hover:underline text-[12px] font-bold'>{item.name}</Link>
                </li>
              ))
            }
          </ul>
          <div className='flex gap-4 w-full'>
            {/* {categories.map((category, idx) => (
              <div key={idx} className={`w-full max-w-[200px]`}>
                {category. && (
                  <h3 className=" text-[13px] font-bold text-[#001D3DBF] mb-4">{category.title}</h3>
                )}
                <ul className="space-y-2">
                  {category.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-[13px] text-gray-600 hover:text-primary hover:underline transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}

            {Object.entries(groupedCategories).map(([group, items], idx) => (
              <div key={idx} className="w-full max-w-[200px]">
                {/* Render the group title */}
                {group && (
                  <h3 className="text-[13px] font-bold text-[#001D3DBF] mb-4">{group}</h3>
                )}

                {/* Render the items under this group */}
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={`/collection/${generateSlug(item.name)}`}  
                        className="text-[13px] text-gray-600 hover:text-primary hover:underline transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;