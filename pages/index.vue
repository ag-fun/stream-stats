<template>
  <Card>
    <template #title>Game Stats</template>
    <template #content>
      <DataTable :value="allData" tableStyle="min-width: 100%">
        <Column field="team1" :header="team1">
          <template #body="slotProps">
            <div class="flex items-center">
              <span>{{ slotProps.data.team1 }}</span>
            </div>
          </template>
        </Column>
        <Column field="name" :header="score"></Column>
        <Column field="team2" :header="team2"></Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // Import useRoute to get the URL parameters

// Use Vue's ref for reactivity
const allData = ref([]);

const team1 = ref("");
const team2 = ref("");
const score = ref("");

onMounted(() => {
  // read the url from the path parameter url
  const route = useRoute(); // Get the current route object

  const urlParam = route.params.urlParam; // Read the 'urlParam' from the URL path parameters

  const apiUrl = `https://corsproxy.io/?${encodeURIComponent(urlParam)}`; // Use the parameter in the API URL
  console.log(apiUrl);
  fetch(
    "https://corsproxy.io/?https%3A%2F%2Fwww.commentarysource.com%2Fdfv%2Fapi%2Fv2%2Fdnc2024%2Ffield2%2Fcurrent%2Fstats"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedData = generateData(data);
      console.log(transformedData);
      allData.value = transformedData; // Assign transformed data to allData
    });
});

// Field mapping
const field_mapping = [
  ["Turns", "team1Turns", "team2Turns"],
  ["Breaks", "team1DConversions", "team2DConversions"],
  ["Holds", "team1OConversions", "team2OConversions"],
  ["Clean Holds", "team1OPerfectConversions", "team2OPerfectConversions"],
  ["Turns", "team1Turns", "team2Turns"],
  ["Breaks", "team1DConversions", "team2DConversions"],

  // Add more mappings as needed
];

// Generate transformed data
const generateData = (data) => {
  team1.value = data[0].team1Name;
  team2.value = data[0].team2Name;
  score.value = `${data[0].team1Score}:${data[0].team2Score}`;

  return field_mapping.map(([name, team1Field, team2Field]) => ({
    team1: data[0][team1Field],
    name,
    team2: data[0][team2Field],
  }));
};
</script>

<style scoped>
/* set font robot */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

.card {
  font-family: "Roboto", sans-serif;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
