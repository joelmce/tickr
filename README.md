# tickr.app

Tickr is a web app designed for traders and investors to efficiently monitor stock tickers in real-time. The application features a customizable dashboard that allows users to track their preferred stocks and analyse market trends.

## Key Features:

**User Registration and Login**:

- Users can create accounts and log in securely to access the dashboard.

**Customizable Dashboard:**

- Users can personalize their dashboard by adding, removing, and rearranging stock tickers.
- Each ticker widget displays real-time data, including current price, percentage change, and trading volume.

**Real-Time Stock Data:**

- The application fetches real-time stock data from reliable sources, ensuring accurate and up-to-date information.
- Stock information includes price changes, trading volume, market capitalization, and more

**Sharing and Collaboration:**

- Users can share their customized dashboards with others.
- Collaborative features allow multiple users to view and edit shared dashboards for teamwork and analysis.

## Technology Stack:

**Frontend**: HTML, CSS, JavaScript & React

**Backend**: NextJS

**Database**: Supabase (Postgresql)

**APIs**: TBD

**Authentication**: TBD

## MVP Goal:

The MVP aims to provide a seamless experience for traders to track stock tickers, customize their dashboards, and share insights. It focuses on core features such as real-time data and customization options to meet the immediate needs of users. Future iterations will involve expanding the notification system and trading tools available.

## Component design

```xml
<App>
    <NavBar/>
    <Dashboard creator="Joel" title="My dashboard">
        <Tickers>
            <Ticker symbol="BTC/USD">
                <title/>
                <graph/>
                <information dailyOpen="" dailyClose="">
            </Ticker>
            <Ticker symbol="ETH/USD">
                <title/>
                <graph/>
                <information dailyOpen="" dailyClose="">
            </Ticker>
        </Tickers>
        <Options>
            <save/>
            <share/>
        <Options/>
    </Dashboard>
</App>
```
