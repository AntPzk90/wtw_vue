<template>
  <div>
    <wtw-promo-film></wtw-promo-film>
    <wtw-page-content></wtw-page-content>
  </div>
</template>

<script>
import WtwPromoFilm from '@/components/PromoFilm';
import WtwPageContent from '@/components/PageContent';

export default {
  name: 'WtwMain',
  components: {
    WtwPromoFilm,
    WtwPageContent,
  },
};
</script>
