<template>
    <div>
      <div class="bar-chart">
        <div class="bar january" ref="januaryBar">
          <span>40%</span>
        </div>
        <div class="bar february" ref="februaryBar">
          <span>60%</span>
        </div>
        <div class="bar march" ref="marchBar">
          <span>80%</span>
        </div>
        <div class="bar april" ref="aprilBar">
          <span>50%</span>
        </div>
        <div class="bar may" ref="mayBar">
          <span>90%</span>
        </div>
        <div class="bar june" ref="juneBar">
          <span>30%</span>
        </div>
        <div class="bar july" ref="julyBar">
          <span>70%</span>
        </div>
        <div class="bar august" ref="augustBar">
          <span>62%</span>
        </div>
        <div class="bar september" ref="septemberBar">
          <span>34%</span>
        </div>
        <div class="bar october" ref="octoberBar">
          <span>58%</span>
        </div>
        <div class="bar november" ref="novemberBar">
          <span>74%</span>
        </div>
        <div class="bar december" ref="decemberBar">
          <span>60%</span>
        </div>
      </div>
  
      <div class="label">
        <span>Tháng 1</span>
        <span>Tháng 2</span>
        <span>Tháng 3</span>
        <span>Tháng 4</span>
        <span>Tháng 5</span>
        <span>Tháng 6</span>
        <span>Tháng 7</span>
        <span>Tháng 8</span>
        <span>Tháng 9</span>
        <span>Tháng 10</span>
        <span>Tháng 11</span>
        <span>Tháng 12</span>
      </div>
    </div>
  </template>
  

  <script setup>
  import { onMounted, getCurrentInstance } from 'vue';
  
  onMounted(() => {
    const { proxy } = getCurrentInstance();
    
    const bars = [
      { ref: 'januaryBar', height: '40%' },
      { ref: 'februaryBar', height: '60%' },
      { ref: 'marchBar', height: '80%' },
      { ref: 'aprilBar', height: '50%' },
      { ref: 'mayBar', height: '90%' },
      { ref: 'juneBar', height: '30%' },
      { ref: 'julyBar', height: '70%' },
      { ref: 'augustBar', height: '62%' },
      { ref: 'septemberBar', height: '34%' },
      { ref: 'octoberBar', height: '58%' },
      { ref: 'novemberBar', height: '74%' },
      { ref: 'decemberBar', height: '60%' },
    ];
  
    bars.forEach((bar) => {
      const element = proxy.$refs[bar.ref];
      setTimeout(() => {
        element.style.height = bar.height;
      }, 100); // Delay for animation effect
    });
  });
  </script>
  
  

  <style scoped>
  .bar-chart {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 300px;
    width: 100%;
    border: 1px solid #ccc;
    padding: 20px;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 5%;
  }
  
  .bar {
    width: 50px;
    background-color: #1b1f23;
    text-align: center;
    color: #fff;
    font-family: Arial, sans-serif;
    position: relative;
    height: 0; 
    transition: height 1s ease; 
  }
  
  .bar span {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
  }
  
  .label {
    margin-top: 10px;
    font-family: Arial, sans-serif;
    display: flex;
    margin-left: 3%;
    gap: 3.5%;
  }
  </style>
  