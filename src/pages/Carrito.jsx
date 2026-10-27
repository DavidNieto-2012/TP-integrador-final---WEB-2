const Carrito = () => {
  const { carrito, totalPrecio, vaciarCarrito } = useContext(CarritoContext);
  return (
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-4">Carrito de Compras</h2>
      ${this.items.length === 0
        ? html`<p class="text-sm text-gray-400">El carrito está vacío</p>`
        : this.items.map(item => html`
              <carrito-item .item=${item}></carrito-item>
            `)
      }

      <div class="carrito-detalle-footer mt-4 border-t pt-4">
        <div class="carrito-detalle-total flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>$${totalPrecio.toFixed(2)}</span>
        </div>
        <div class="carrito-detalle-acciones flex gap-2">
          <button class="btn-vaciar" @click=${this._onVaciar}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"></path>
            <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
          </svg>
          Vaciar carrito
        </button>
        <button class="btn-comprar" @click=${this._onComprar}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="18" r="1.5"></circle>
          <circle cx="17" cy="18" r="1.5"></circle>
          <path d="M3 4h2l2.4 9.5a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L19 7H7"></path>
        </svg>
        Ver carrito y comprar
      </button>
    </div>
        </div >  

      </div >
  );
};

export default Carrito;