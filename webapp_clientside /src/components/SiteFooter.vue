<template>
  <footer class="footer">
    <div class="container columns">
      <div class="col brand">
        <router-link to="/" class="logo">🌿Happy<span>Zoo</span></router-link>
        <p>A park committed to wildlife preservation and public awareness.</p>
      </div>

      <div class="col">
        <h4>Explore</h4>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/animals">The Animals</router-link></li>
          <li><router-link to="/zones">The Zones</router-link></li>
          <li><router-link to="/tickets">Tickets &amp; Prices</router-link></li>
        </ul>
      </div>

      <div class="col">
        <h4>Opening Hours</h4>
        <p>Monday to Sunday<br />09:30 AM to 06:30 PM</p>
        <p class="small">Ticket offices close at 05:00 PM</p>
      </div>

      <div class="col">
        <h4>Contact</h4>
        <p>📍 Reserve Road, 75000 Paris</p>
        <p>📞 01 23 45 67 89</p>
        <p>✉ contact@zoowildlife.fr</p>
      </div>
    </div>

    <div class="bottom">
      <p>&copy; 2026 HappyZoo. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 40px;
  padding: 56px 0 20px;
  background: var(--forest-deep);
  color: var(--mint);
  border-top-left-radius: 64px;
  border-top-right-radius: 8px;
}

.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: space-between;
  margin-bottom: 40px;
}

.col {
  flex: 1;
  min-width: 190px;
}

.col p {
  margin-bottom: 8px;
}

.small {
  font-size: 0.88rem;
  color: #a9b8ae;
}

.logo {
  display: inline-block;
  margin-bottom: 12px;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
}

.logo span {
  color: var(--orange);
}

h4 {
  margin-bottom: 14px;
  color: #fff;
  font-size: 1.1rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  margin-bottom: 9px;
}

li a:hover {
  color: var(--orange);
}

.bottom {
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 0.85rem;
  color: #a9b8ae;
}
</style>