#!/usr/bin/env node

/**
 * Dependency Fix Script for Expo Projects
 * 
 * This script helps resolve common dependency issues that can cause
 * "java.io.IOException: Failed to download remote update" errors.
 * 
 * Run with: node fix-dependencies.js
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Fixing Expo project dependencies...\n');

try {
  // Step 1: Clear npm cache
  console.log('1. Clearing npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  
  // Step 2: Remove node_modules and package-lock.json
  console.log('2. Removing old dependencies...');
  if (fs.existsSync('node_modules')) {
    execSync('rmdir /s /q node_modules', { stdio: 'inherit' });
  }
  if (fs.existsSync('package-lock.json')) {
    fs.unlinkSync('package-lock.json');
  }
  
  // Step 3: Install with legacy peer deps
  console.log('3. Installing dependencies with legacy peer deps...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  // Step 4: Fix Expo dependencies
  console.log('4. Fixing Expo dependencies...');
  execSync('npx expo install --fix', { stdio: 'inherit' });
  
  // Step 5: Install missing peer dependencies
  console.log('5. Installing missing peer dependencies...');
  execSync('npx expo install @expo/metro-runtime react-native-worklets', { stdio: 'inherit' });
  
  // Step 6: Run expo doctor
  console.log('6. Running final health check...');
  execSync('npx expo-doctor', { stdio: 'inherit' });
  
  console.log('\n✅ Dependencies fixed successfully!');
  console.log('You can now run: npx expo start');
  
} catch (error) {
  console.error('\n❌ Error fixing dependencies:', error.message);
  console.log('\nTry running these commands manually:');
  console.log('1. npm cache clean --force');
  console.log('2. rmdir /s /q node_modules');
  console.log('3. del package-lock.json');
  console.log('4. npm install --legacy-peer-deps');
  console.log('5. npx expo install --fix');
  console.log('6. npx expo install @expo/metro-runtime react-native-worklets');
  process.exit(1);
}
