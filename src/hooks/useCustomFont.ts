import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

const CUSTOM_FONT_FAMILY = 'BoldonseRegular';
const CUSTOM_FONT_PATH = require('../../assets/fonts/Boldonse-Regular.ttf');

export function useCustomFont() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'BoldonseRegular': CUSTOM_FONT_PATH,
        });
        
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading custom font:', error);
        setFontsLoaded(true); // Continue even if font loading fails
      }
    }

    loadFonts();
  }, []);

  return {
    fontsLoaded,
    fontFamily: CUSTOM_FONT_FAMILY,
  };
}

export const customFontFamily = CUSTOM_FONT_FAMILY;
