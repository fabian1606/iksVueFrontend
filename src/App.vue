<template>
  <div id="container">
    <transformDiv @cornerPosUpdate="(event) => ContentDataService.setUpperScreenDistortion(event)"> #
      <div>
        <iframe ref="figma" style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" :src="`https://www.figma.com/embed?embed_host=example&embed_origin=${origin}&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fwye1BwyUDq1kzooNnSPxbr%2FUntitled%3Fnode-id%3D1-2%26t%3DUnTsSK1ArgbjIpTY-1%26scaling%3Dmin-zoom%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D1%253A2`"></iframe>
        <button @click="navigateToPage('1:4')">Navigate to Page</button>
      </div>
    </transformDiv>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import  transformDiv from './components/transformDiv.vue'
import ContentDataService from './services/ContentDataService.js'

const corners = ref([]);
const url = ref('https://www.youtube.com/embed/1y_kfWUCFDQ');
const figma = ref(null);
const origin = ref(window.location.origin);



// on Mounted
onMounted(() => {
  console.log(origin.value);
  window.addEventListener("message", (event) => {
    console.log(`Received message ${JSON.stringify(event.data)}`);
  });
});
function navigateToPage(nodeId) {
  const iframe = figma.value;
  // iframe.contentWindow.postMessage({ type: 'emulateKey', key: ' ' }, '*');
  // console.log(origin.value);
  figma.value.contentWindow.postMessage(
  //   // {"type":"MOUSE_PRESS_OR_RELEASE","data":{"handled":true,"presentedNodeId":"1:4","targetNodeId":"1:4","targetNodeMousePosition":{"x":253,"y":62},"nearestScrollingFrameId":"1:4","nearestScrollingFrameMousePosition":{"x":253,"y":62},"nearestScrollingFrameOffset":{"x":0,"y":0}}},
    {
      type: "NAVIGATE_TO_FRAME_AND_CLOSE_OVERLAYS",
      data: {
        nodeId: nodeId,
      },
    },
    "*" // recipient orWigin
  );
}
// onMounted(() => {
//   ContentDataService.getContents();
// });

</script>

<style scoped>
iframe .embed_documentation_footer--documentationFooter--cRlI0{
  display: none;
  background-color: red;
}

</style>
