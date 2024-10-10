const image = document.querySelectorAll(".main-image");
const category = document.querySelectorAll(".category");
const price = document.querySelectorAll(".price");
const namee = document.querySelectorAll(".name");
const addToCard = document.querySelectorAll(".add-to-card");

fetch("data.json")
  .then((response) => {
    if (!response.ok) console.log("Fetching Data Error");
    else return response.json();
  })
  .then((data) => {
    const mealCounts = Array(data.length).fill(0);
    const totalPriceArray = Array(data.length).fill(0);

    data.forEach((item, index) => {
      // Populate the data from the JSON file
      image[index].src = item.image.mobile;
      category[index].textContent = item.category;
      namee[index].textContent = item.name;
      price[index].textContent = `$${item.price.toFixed(2)}`;

      // Initialize counter and button elements
      let counter = 0;
      const button = addToCard[index];
      const quantityElement = button.querySelector(".quantity");
      const increment = button.querySelector(".increment");
      const decrement = button.querySelector(".decrement");
      const completeTotal = document.querySelector(".pay .complete-total");
      const delivery = document.querySelector(".pay .delivery");
      const finalPrice = document.querySelectorAll(".final-price");
      const confirmation = document.querySelector(".pay .confirmation");
      const done = document.querySelector(".confirm-order");
      const newOrder = document.querySelector(".new-order");

      // Update the total orders
      const updateTotalOrders = () => {
        const totalOrders = mealCounts.reduce((acc, cur) => acc + cur, 0);
        document.querySelector(".orders").textContent = totalOrders;

        // Show/hide the cart elements based on the total orders
        if (totalOrders === 0) {
          // Show empty cart message
          document.querySelector(".pay > img").style.display = "block";
          document.querySelector(".pay > span").style.display = "block";
          completeTotal.classList.add("hidden");
          delivery.classList.add("hidden");
          confirmation.classList.add("hidden");
        } else {
          // Hide empty cart message
          document.querySelector(".pay > img").style.display = "none";
          document.querySelector(".pay > span").style.display = "none";
          completeTotal.classList.remove("hidden");
          completeTotal.classList.add("flex");
          delivery.classList.remove("hidden");
          delivery.classList.add("flex");
          confirmation.classList.remove("hidden");
        }
      };

      // Update the total price
      const updateTotalPrice = () => {
        const totalPrice = totalPriceArray.reduce((acc, cur) => acc + cur, 0);
        finalPrice.forEach((e) => {
          e.textContent = `$${totalPrice.toFixed(2)}`;
        });
      };

      // Function to update or create the cloned item in the cart
      const updateCartItem = () => {
        const templatesContainer = document.querySelector(".pay .templates");
        const confirmationMealsContainer =
          document.querySelector(".bought-meals");
        let existingItem = templatesContainer.querySelector(
          `[data-index="${index}"]`
        );
        let secondExistingItem = confirmationMealsContainer.querySelector(
          `[data-index="${index}"]`
        );

        if (!existingItem) {
          const template = document.querySelector(".pay .template");
          existingItem = template.cloneNode(true);
          existingItem.classList.remove("hidden");
          existingItem.classList.add("flex");
          existingItem.setAttribute("data-index", index);
          templatesContainer.appendChild(existingItem);

          const confitmationTemplate = document.querySelector(
            ".bought-meals .bought-meal"
          );
          secondExistingItem = confitmationTemplate.cloneNode(true);
          secondExistingItem.setAttribute("data-index", index);
          confirmationMealsContainer.appendChild(secondExistingItem);

          // Add event listener for removing the item
          const removeOrder = existingItem.querySelector(".remove-order");
          removeOrder.addEventListener("click", () => {
            templatesContainer.removeChild(existingItem);
            confirmationMealsContainer.removeChild(secondExistingItem);
            mealCounts[index] = 0;
            totalPriceArray[index] = 0; // Reset the total price for this item
            counter = 0;
            updateTotalOrders();
            updateTotalPrice();

            // Reset the button styles if the item is removed
            button.previousElementSibling.style.border = "";
            button.querySelector("span.add").textContent = "Add to cart";
            button.style.backgroundColor = "";
            button.querySelector("img:first-child").style.display = "";
          });
        }

        existingItem.querySelector(".name").textContent = item.name;
        existingItem.querySelector(".average").textContent = `${counter}x`;
        existingItem.querySelector(
          ".price"
        ).textContent = `@ $${item.price.toFixed(2)}`;
        const totalOrder = item.price * counter;
        existingItem.querySelector(
          ".total-order"
        ).textContent = `$${totalOrder.toFixed(2)}`;

        secondExistingItem.querySelector(".name").textContent = item.name;
        secondExistingItem.querySelector(".thumbnail").src =
          item.image.thumbnail;
        secondExistingItem.querySelector(
          ".average"
        ).textContent = `${counter}x`;
        secondExistingItem.querySelector(
          ".price"
        ).textContent = `@ ${item.price.toFixed(2)}`;
        secondExistingItem.querySelector(
          ".total-order"
        ).textContent = `$${totalOrder.toFixed(2)}`;
        secondExistingItem.style.display = "flex";
        secondExistingItem.borderBottom = "1px solid var(--rose-300)";

        // Update the total price array
        totalPriceArray[index] = totalOrder;
        updateTotalPrice();
      };

      // Increment and Decrement functionality
      increment.addEventListener("click", () => {
        counter++;
        quantityElement.textContent = counter;
        mealCounts[index] = counter;
        updateTotalOrders();
        updateCartItem();
      });

      decrement.addEventListener("click", () => {
        if (counter > 1) {
          counter--;
          quantityElement.textContent = counter;
          mealCounts[index] = counter;
          updateTotalOrders();
          updateCartItem();
        }
      });

      // Main button click handler
      button.addEventListener("click", () => {
        if (counter === 0) {
          counter = 1;
          quantityElement.textContent = counter;
          mealCounts[index] = counter;
          updateTotalOrders();
          updateCartItem();

          // Update UI styles
          button.previousElementSibling.style.border = "2px solid var(--red)";
          button.querySelector("span.add").textContent = "";
          button.style.backgroundColor = "var(--red)";
          button.querySelector("img:first-child").style.display = "none";
        }
      });

      confirmation.addEventListener("click", () => {
        done.classList.remove("hidden");
      });

      newOrder.addEventListener("click", () => {
        location.reload();
      });
    });
  })
  .catch((error) =>
    console.error("There is a problem in the connection: ", error)
  );
