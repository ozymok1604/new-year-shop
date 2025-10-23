import React, { useState } from 'react';
import styles from './styles.module.scss';
import NovaPostSearch from './NovaPostSearch';
import { ShoppingCartIcon } from '@phosphor-icons/react';
import emailjs from 'emailjs-com';
import OrderSuccessModal from '../OrderSuccessModal/OrderSuccessModal';

const DeliveryBottomSheet = ({ onSubmit, product }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !selectedDivision) {
      alert('Будь ласка, заповніть усі поля');
      return;
    }

    const orderData = {
      name,
      phone,
      product: `${product?.name ?? 'Ялинка'} (${product?.size ?? ''} м, ${
        product?.price?.toLocaleString('uk-UA') ?? ''
      } грн)`,
      division: selectedDivision.name,
      address: selectedDivision.displayAddress,
    };

    try {
      // ✉️ Надсилаємо через EmailJS
      await emailjs.send(
        'service_mzq9m1s', // твій Service ID
        'template_f096jre', // твій Template ID
        orderData,
        'J7bT_g0gjGqjDdPKA' // твій Public key
      );

      setSuccessOpen(true); // ✅ відкриваємо модалку
      setOpen(false);

      onSubmit({
        ...orderData,
        division: selectedDivision,
      });
    } catch (err) {
      console.error('Email send error:', err);
      alert('❌ Не вдалося надіслати замовлення.');
    }
  };

  return (
    <>
      <OrderSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
      <button onClick={() => setOpen(true)} className={styles.buyButton} type="button">
        <ShoppingCartIcon size={22} weight="bold" />
        <span>Замовити</span>
      </button>

      {open && (
        <div className={styles.sheetOverlay} onClick={() => setOpen(false)}>
          <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <h3>Дані для доставки 🎄</h3>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <div className={styles.form}>
              {/* 🔹 Вивід інформації про обрану ялинку */}
              {product && (
                <div className={styles.productInfo}>
                  <p>
                    <b>Товар:</b> {product.name}
                  </p>
                  <p>
                    <b>Ціна:</b> {product.price?.toLocaleString('uk-UA')} грн
                  </p>
                  {product.size && (
                    <p>
                      <b>Розмір:</b> {product.size} м
                    </p>
                  )}
                </div>
              )}

              <label>Ім’я та прізвище:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше ім’я та прізвище"
              />

              <label>Номер телефону:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380..."
              />

              <NovaPostSearch
                apiKey="ce73f85659e09209ee485640b87c8008"
                onSelectDivision={(division) => setSelectedDivision(division)}
              />

              <button className={styles.submitBtn} onClick={handleSubmit}>
                Підтвердити доставку
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryBottomSheet;
