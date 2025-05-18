




// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const fallbackImages = [
//   { id: 1, url: '/chery3.jpg' },
//   { id: 2, url: '/chery4.jpg' },
//   { id: 3, url: '/chery5.jpg' },
//   { id: 4, url: '/chery6.jpg' },
//   { id: 5, url: '/chery7.jpg' },
//   { id: 6, url: '/chery8.jpg' },
//   { id: 7, url: '/chery9.jpg' },
//   { id: 8, url: '/chery10.jpg' },
//   { id: 9, url: '/chery11.jpg' },
// ];

// const ProductDescription = () => {
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState('/amrood2.jpg');
//   const { id } = useParams();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     const fetchProduct = async () => {
//       try {
//         const docRef = doc(db, "documents", id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = { id: docSnap.id, ...docSnap.data() };
//           setProduct(data);
//           const firstImage = data.images?.[0] || data.image || "/amrood2.jpg";
//           setSelectedImage(firstImage);
//         } else {
//           toast.error("Product not found");
//         }
//       } catch (error) {
//         toast.error("Error fetching product data");
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const addToCart = () => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existing = cart.find((item) => item.id === product.id);

//     const updatedCart = existing
//       ? cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         )
//       : [...cart, { ...product, quantity }];

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     toast.success(`${product.title} added to cart!`);
//   };

//   const thumbnailSettings = {
//     dots: false,
//     infinite: true,
//     arrows: true,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//   };

//   if (!product) {
//     return (
//       <div className="loader-container">
//         <div className="loader"></div>
//         <p className="loader-text">Loading product...</p>
//       </div>
//     );
//   }

//   const images = product.images?.length > 0 ? product.images : fallbackImages.map(img => img.url);

//   return (
//     <div className="product-page">
//       <ToastContainer position="top-right" autoClose={2000} />

//       <div className="product-container">
//         <div className="product-left">
//           <img
//             src={selectedImage}
//             alt={product.title}
//             className="product-image1"
//             onError={(e) => (e.target.src = "/images/placeholder.jpg")}
//           />

//           <Slider {...thumbnailSettings}>
//             {images.map((img, i) => {
//               const imgUrl = typeof img === "string" ? img : img.url;
//               return (
//                 <div key={i}>
//                   <img
//                     src={imgUrl}
//                     alt={`Thumbnail ${i + 1}`}
//                     className={`thumbnail ${selectedImage === imgUrl ? "active" : ""}`}
//                     onClick={() => setSelectedImage(imgUrl)}
//                     onError={(e) => (e.target.src = "/images/placeholder.jpg")}
//                   />
//                 </div>
//               );
//             })}
//           </Slider>
//         </div>

//         <div className="product-right">
//           <h1>{product.title}</h1>
//           <p className="product-price">${product.price}</p>
//           <p className="product-short-description">{product.description}</p>

//           <div className="product-quantity">
//             <label htmlFor="quantity">Quantity:</label>
//             <input
//               id="quantity"
//               type="number"
//               min="1"
//               max={product.stock || 100}
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//           </div>

//           <Link to="/ShoppingCart">
//             <button className="add-to-cart-button" onClick={addToCart}>
//               ADD TO CART
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="accordion-section">
//         <details>
//           <summary>Ingredients</summary>
//           <p>{product.ingredients || "100% organic, fresh fruits handpicked for optimal flavor and quality."}</p>
//         </details>

//         <details>
//           <summary>Watch Video</summary>
//           {product.videoLink ? (
//             <p><a href={product.videoLink} target="_blank" rel="noreferrer">Click to watch</a></p>
//           ) : <p>No video available for this product.</p>}
//         </details>

//         <details>
//           <summary>How To Use</summary>
//           <p>{product.howToUse || "Enjoy fresh, in smoothies, desserts, or snacks."}</p>
//         </details>

//         <details>
//           <summary>Why Love This Product</summary>
//           <p>{product.whyLove || "Packed with essential nutrients, supports immunity, and provides natural energy."}</p>
//         </details>
//       </div>

//       {/* Testimonials Section */}
      
//       <div className="testimonial-section">
//         <h4 className="subheading">TESTIMONIALS</h4>
//         <h2 className="heading">OUR CUSTOMERS REVIEW</h2>
//         <p className="description">
//         Fresh fruits are nature’s sweet gift, loved by generations for their taste and health benefits. From orchards to your table, fruits have remained a delicious part of our lives for centuries.
//         </p>

//         {/* <Slider {...thumbnailSettings}> */}
//         <div className="testimonial-cards">
//           <div className="card">
//             <img src="/DanielKim.jpg" alt="user" className="user-img" />
//             <h3>Daniel Kim</h3>
//             <div className="quote-icon">❝</div>
//             <p className="review-text">All round, an amazing service, delivery was quick and the fruits were super fresh and well packaged.</p>
//             <div className="stars">★★★★★</div>
//           </div>

//           <div className="card">
//             <img src="/SaraAhmed.jpg" alt="user" className="user-img" />
//             <h3>Sara Ahmed</h3>
//             <div className="quote-icon green">❝</div>
//             <p className="review-text">I was impressed by the quality and the sweetness of the fruits. Will definitely reorder!</p>
//             <div className="stars">★★★★☆</div>
//           </div>

//           <div className="card">
//             <img src="/Olivia.jpg" alt="user" className="user-img" />
//             <h3>Olivia</h3>
//             <div className="quote-icon purple">❝</div>
//             <p className="review-text">Natural, fresh and timely delivery. My whole family loved the box!</p>
//             <div className="stars">★★★★★</div>
//           </div>
//         </div>
//         {/* </Slider> */}
//       </div>
//     </div>
//   );
// };

// export default ProductDescription;





import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Slider from "react-slick";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productData } from "../Data"; // <-- Your local images array

const fallbackImages = [
  { id: 1, url: "/chery3.jpg" },
  { id: 2, url: "/chery4.jpg" },
  { id: 3, url: "/chery5.jpg" },
];

const ProductDescription = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("/amrood2.jpg");
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };

          // Find local product images
          const localProduct = productData.find(
            (p) => p.id === data.id || p.name === data.title
          );

          const firebaseMainImage =
            data.image || (data.images && data.images[0]) || "/amrood2.jpg";

          const localImages = localProduct?.images || [];

          // Avoid duplicate if firebase image is already in local array
          const thumbnails = [
            firebaseMainImage,
            ...localImages.filter((img) => img !== firebaseMainImage),
          ];

          setProduct({ ...data, thumbnails });
          setSelectedImage(firebaseMainImage);
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        toast.error("Error fetching product data");
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    const updatedCart = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart, { ...product, quantity }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${product.title} added to cart!`);
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  if (!product) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Loading product...</p>
      </div>
    );
  }

  const images =
    product.thumbnails?.length > 0
      ? product.thumbnails
      : fallbackImages.map((img) => img.url);

  return (
    <div className="product-page">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="product-container">
        {/* LEFT SIDE */}
        <div className="product-left">
          <img
            src={selectedImage}
            alt={product.title}
            className="product-image1"
            onError={(e) => (e.target.src = "/images/placeholder.jpg")}
          />

          <Slider {...thumbnailSettings}>
            {images.map((imgUrl, i) => (
              <div key={i}>
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${i + 1}`}
                  className={`thumbnail ${
                    selectedImage === imgUrl ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(imgUrl)}
                  onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* RIGHT SIDE */}
        <div className="product-right">
          <h1>{product.title}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-short-description">{product.description}</p>

          <div className="product-quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.stock || 100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <Link to="/ShoppingCart">
            <button className="add-to-cart-button" onClick={addToCart}>
              ADD TO CART
            </button>
          </Link>
        </div>
      </div>

      {/* ACCORDION SECTION */}
      <div className="accordion-section">
        <details>
          <summary>Ingredients</summary>
          <p>
            {product.ingredients ||
              "100% organic, fresh fruits handpicked for optimal flavor and quality."}
          </p>
        </details>

        <details>
          <summary>Watch Video</summary>
          {product.videoLink ? (
            <p>
              <a href={product.videoLink} target="_blank" rel="noreferrer">
                Click to watch
              </a>
            </p>
          ) : (
            <p>No video available for this product.</p>
          )}
        </details>

        <details>
          <summary>How To Use</summary>
          <p>
            {product.howToUse ||
              "Enjoy fresh, in smoothies, desserts, or snacks."}
          </p>
        </details>

        <details>
          <summary>Why Love This Product</summary>
          <p>
            {product.whyLove ||
              "Packed with essential nutrients, supports immunity, and provides natural energy."}
          </p>
        </details>
      </div>

      {/* TESTIMONIALS */}
      <div className="testimonial-section">
        <h4 className="subheading">TESTIMONIALS</h4>
        <h2 className="heading">OUR CUSTOMERS REVIEW</h2>
        <p className="description">
          Fresh fruits are nature’s sweet gift, loved by generations for their
          taste and health benefits. From orchards to your table, fruits have
          remained a delicious part of our lives for centuries.
        </p>

        <div className="testimonial-cards">
          <div className="card">
            <img src="/DanielKim.jpg" alt="user" className="user-img" />
            <h3>Daniel Kim</h3>
            <div className="quote-icon">❝</div>
            <p className="review-text">
              All round, an amazing service, delivery was quick and the fruits
              were super fresh and well packaged.
            </p>
            <div className="stars">★★★★★</div>
          </div>

          <div className="card">
            <img src="/SaraAhmed.jpg" alt="user" className="user-img" />
            <h3>Sara Ahmed</h3>
            <div className="quote-icon green">❝</div>
            <p className="review-text">
              I was impressed by the quality and the sweetness of the fruits.
              Will definitely reorder!
            </p>
            <div className="stars">★★★★☆</div>
          </div>

          <div className="card">
            <img src="/Olivia.jpg" alt="user" className="user-img" />
            <h3>Olivia</h3>
            <div className="quote-icon purple">❝</div>
            <p className="review-text">
              Natural, fresh and timely delivery. My whole family loved the
              box!
            </p>
            <div className="stars">★★★★★</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
