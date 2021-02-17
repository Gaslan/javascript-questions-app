<template>
<div style="width:300px;height:80px;padding:20px;">
  <div class="country-dropdown" :class="this.opened ? 'opened' : ''">
    <div class="country-dropdown-inner">
      <span class="country-dropdown-current" @click="handleClick">
        <div class="country-dropdown-menu-item">
          <img :src="getFlag(this.selected.country)" :alt="this.selected.countryName" />
          <span class="country-name" v-text="this.selected.countryName"></span>
          <span class="dropdown-arrow">▲</span>
        </div>
      </span>
      <div class="country-dropdown-menu">
        <ul>
          <li v-for="country in this.countries" :key="country.country">
            <div class="country-dropdown-menu-item">
              <img :src="getFlag(country.country)" :alt="country.countryName" />
              <span class="country-name" v-text="country.countryName"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'CountryDropdown',
  data() {
    return {
      opened: false,
      selected: {
        language: 'tr',
        countryLanguage: 'TR',
        country: 'TR',
        countryName: 'Türkiye'
      },
      countries: [{
        language: 'ar',
        countryLanguage: 'EG',
        country: 'SA',
        countryName: 'العربية'
      },{
        language: 'ar',
        countryLanguage: 'EG',
        country: 'EG',
        countryName: 'اللغة العامية'
      },{
        language: 'bs',
        countryLanguage: 'BS',
        country: 'BA',
        countryName: 'Bosanski'
      },{
        language: 'de',
        countryLanguage: 'DE',
        country: 'DE',
        countryName: 'Deutsch'
      },
      {
        language: 'tr',
        countryLanguage: 'TR',
        country: 'TR',
        countryName: 'Türkiye'
      }]
      //'es', 'fr', 'id', 'ja', 'ko', 'nl'  , 'pt', 'ru', 'th', 'tr', 'ua', 'vi', 'zh'
    }
  },
  methods: {
    getFlag(country) {
      return `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`
    },
    handleClick() {
      this.opened = !this.opened
    }
  }
}
</script>

<style>
.country-dropdown{
  width: 100%;
  height: 100%;
  position: relative;
}

.country-dropdown .country-dropdown-inner{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px solid #333;
}

.country-dropdown-current{
  display: inline-block;
  width: 100%;
  cursor: pointer;
}

.country-dropdown-menu{
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #333;
  display: none;
}

.country-dropdown.opened .country-dropdown-menu{
  display: block;
}

.dropdown-arrow{
  transform: rotateZ(180deg);
}

.country-dropdown.opened .dropdown-arrow{
  transform: rotateZ(0deg);
}

.country-dropdown-menu-item{

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 12px;
}

.country-dropdown-menu-item img{
  width: 36px;
  height: 24px;
}

.country-dropdown-menu-item .country-name{
  font-weight: 700;
  font-size: 18px;
  display: inline-block;
  margin-left: 12px;
  flex-grow: 1;
}

.country-dropdown-menu ul{
  list-style: none;
  margin: 0;
  padding: 0;
}

.country-dropdown-menu ul li{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* border-bottom: 1px solid #333; */
}

.country-dropdown-menu ul li:hover{
  background: #e4e5e6;
}
</style>