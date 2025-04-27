<template>
    <header class="header">
        <nav class="nav">
            <div class="logo">My Electron App</div>
            <ul class="nav-links">
                <li>
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li>
                    <router-link to="/about" class="nav-link">About</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
};
</script>

<style scoped>
.header {
    position: fixed;
    top: 10%;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-links li {
    margin-left: 2rem;
}

.nav-link {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    transition: color 0.3s;
}

.nav-link:hover {
    color: #007bff;
}

.router-link-active {
    color: #007bff;
    font-weight: bold;
}
</style>