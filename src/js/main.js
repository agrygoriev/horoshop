"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const addCommentLink = document.querySelector("a[href='#addComment']");
  const textArea = document.querySelector(".orderCheckoutFieldset__textarea");
  const customerTab = document.querySelector("a[href='#customer']");
  console.log(customerTab);
  const registeredCustomerTab = document.querySelector("a[href='#registered-customer']");
  console.log(registeredCustomerTab);
  const customerForm = document.querySelector("form[name='order-checkout']");
  console.log(customerForm);
  const registeredCustomerForm = document.querySelector("form[name='order-checkout-registered']");
  addCommentLink.addEventListener("click", (ev) => {
    ev.preventDefault();
    addCommentLink.classList.add("orderCheckoutFieldset__link_hidden");
    textArea.classList.remove("orderCheckoutFieldset__textarea_hidden");
  });
  customerTab.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (registeredCustomerTab.classList.contains("tabs__tab_selected")) {
      registeredCustomerTab.classList.remove("tabs__tab_selected");
      customerTab.classList.add("tabs__tab_selected");
    }
    if (customerForm.classList.contains("orderCheckout_hidden")) {
      customerForm.classList.remove("orderCheckout_hidden");
      registeredCustomerForm.classList.add("orderCheckout_hidden");
    }
  });
  registeredCustomerTab.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (customerTab.classList.contains("tabs__tab_selected")) {
      customerTab.classList.remove("tabs__tab_selected");
      registeredCustomerTab.classList.add("tabs__tab_selected");
    }
    if (registeredCustomerForm.classList.contains("orderCheckout_hidden")) {
      registeredCustomerForm.classList.remove("orderCheckout_hidden");
      customerForm.classList.add("orderCheckout_hidden");
    }
  });
});