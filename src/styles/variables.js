import { css } from "@emotion/react/macro";

const variables = css`

  html[data-theme="appleMusic"] {
    --systemPrimary: rgba(0, 0, 0, 0.88);
    --systemPrimarySize: 12px;
    --systemAccentBG: #d60017;

    --systemSecondary: rgba(0, 0, 0, 0.56);
    --systemSecondarySize: 12px;

    --grid-column-gap: 20px;
    --scroll-margin: 0;
    --grid-auto-columns: calc((100% - 4 * 20px) / 5);
    --grid-auto-columns-large: calc((100% - 5 * 20px) / 6);

    --artworkBorderRadius: 6px;
    --artworkBoxShadow: 0 4px 14px rgb(0 0 0 / 10%);
    --artworkMarginBottom: 0;

    --shelfItemMargin: 0 -15px;
    --shelfItemPadding: 0 15px;
    --shelfItemBorderRadius: 0;
    --shelfItemBackgroundColor: none;
    --shelfItemBackgroundColorHover: none;
    --shelfItemTransition: background-color 0.1s ease-in;
    --shelfItemIsSelectedBackgroundColor: none;

    --outline: solid rgba(214, 0, 23, 0.6) 5px;
    --outlineOffset: 2px;

    --controlsBackgroundColorHover: rgba(51, 51, 51, 0.3);

    --metadataFontSize: 12px;
    --metadataFontWeight: 400;
    --metadataLineHeight: 1.25;
    --metadataMarginBottom: 0;

    --metadataTitleFontSize: 12px;
    --metadataTitleFontWeight: 400;
    --metadataTitleLineHeight: 1.25;
    --metadataTitleMarginBottom: 0;

    --resultsForFontSize: 17px;
    --resultsForFontWeight: 700;
    --resultsForLetterSpacing: normal;
    --resultsForLineHeight: initial;

    --resultsOptionsFontSize: 15px;
    --resultsOptionsFontWeight: 400;
    --resultsOptionsLetterSpacing: 0;
    --resultsOptionsLineHeight: 1.33338;
    --resultsOptionsColor: #d60017;
    --resultsOptionsTextTransform: none;

    --sidebarHeaderFontSize: 15px;
    --sidebarHeaderFontWeight: 500;
    --sidebarHeaderFontWeightLight: 300;

    --sidebarHeaderFontWeightSelected: 700;
    --sidebarHeaderLineHeight: 1.46667;

    --inputBackgroundColor: #fff;
    --inputColor: var(--systemSecondary);
    --inputFontSize: 14px;
    --inputBorder: solid 1px rgba(0, 0, 0, 0.15);
    --inputPadding: 0.78571429em 1em;

    --selectBackgroundColor: #ffffff;
    --selectBorder: solid 1px #d2d2d7;
    --selectBorderRadius: 12px;
    --selectPadding: 0.88235rem 2.35294rem 0.88235rem 0.94118rem;

    --labelDivider: rgba(0, 0, 0, 0.15);

    --main-background-color: #fff;
    --sidebar-background-color: #f9f9f9;
    --text-color: #121416d8;
    --link-color: #543fd7;

    --toggleBG: rgba(0, 0, 0, 0.088);
    --toggleHeight: 32px;
    --toggleWidth: 51px;
    --toggleBorderRadius: 16px;
    --toggleMinWidth: 100%;
    --toggleIndicatorHeight: calc(32px - (2px * 2));
    --toggleIndicatorWidth: calc(32px - (2px * 2));

    --textButtonColor: #d60017;

    --buttonColor: #d60017;
    --buttonBackgroundColor: transparent;
    --buttonFontSize: 15px;
    --buttonFontWeight: 400;
    --buttonLetterSpacing: 0;
    --buttonTextTransform: none;
    --buttonLineHeight: 1.33338;
    --buttonTransform: none;
    --buttonTextDecoration: underline;

    --navArrowFill: #000;
    --bodyBackgroundColor: #ffffff;
  }

  html[data-theme="spotify"] {
    --systemPrimary: #fff;
    --systemPrimarySize: 16px;
    --systemAccentBG: #37b954;

    --systemSecondary: rgb(179, 179, 179);
    --systemSecondarySize: 14px;

    --grid-column-gap: 24px;
    --scroll-margin: 15px;
    --grid-auto-columns: calc((100% - 3 * 24px) / 4);
    --grid-auto-columns: calc((100% - 3 * 24px) / 4);
    --grid-auto-columns-large: calc((100% - 4 * 24px) / 5);

    --artworkBorderRadius: 2px;
    --artworkBoxShadow: 0 8px 24px rgb(0 0 0 / 50%);
    --artworkMarginBottom: 16px;

    --shelfItemMargin: 0;
    --shelfItemPadding: 16px;
    --shelfItemBorderRadius: 4px;
    --shelfItemBackgroundColor: #181818;
    --shelfItemBackgroundColorHover: #282828;
    --shelfItemTransition: background-color 0.3s ease;
    --shelfItemIsSelectedBackgroundColor: rgba(255, 255, 255, 0.3);

    --outline: none;
    --outlineOffset: 0;

    --controlsBackgroundColorHover: none;

    --metadataFontSize: 14px;
    --metadataFontWeight: 400;
    --metadataLineHeight: 16px;
    --metadataMarginBottom: 4px;

    --metadataTitleFontSize: 16px;
    --metadataTitleFontWeight: 700;
    --metadataTitleLineHeight: 24px;
    --metadataTitleMarginBottom: 4px;

    --resultsForFontSize: 24px;
    --resultsForFontWeight: 700;
    --resultsForLetterSpacing: -0.04em;
    --resultsForLineHeight: 28px;

    --resultsOptionsFontSize: 12px;
    --resultsOptionsFontWeight: 700;
    --resultsOptionsLetterSpacing: 0.1em;
    --resultsOptionsLineHeight: 16px;
    --resultsOptionsColor: #b3b3b3;
    --resultsOptionsTextTransform: uppercase;

    --sidebarHeaderFontSize: 14px;
    --sidebarHeaderFontWeight: 700;
    --sidebarHeaderFontWeightLight: 500;

    --sidebarHeaderLineHeight: 16px;

    --inputBackgroundColor: rgba(255, 255, 255, 0.1);
    --inputColor: rgba(255, 255, 255, 0.7);
    --inputFontSize: 14px;
    --inputBorder: 0;
    --inputPadding: 8px 16px;

    --labelDivider: #282828;

    --main-background-color: #121212;
    --sidebar-background-color: #000;
    --text-color: #121416d8;
    --link-color: #543fd7;

    --toggleBG: #505050;
    --toggleHeight: 16px;
    --toggleWidth: 30px;
    --toggleBorderRadius: 11px;
    --toggleMinWidth: 30px;
    --toggleIndicatorHeight: 12px;
    --toggleIndicatorWidth: 12px;

    --textButtonColor: #fff;

    --selectBackgroundColor: #333333;
    --selectBorder: none;
    --selectBorderRadius: 4px;
    --selectPadding: 10px 2.35294rem 10px.94118rem;

    --buttonColor: #ffffff;
    --buttonFontSize: 12px;
    --buttonFontWeight: 700;
    --buttonLetterSpacing: 1.76px;
    --buttonTextTransform: uppercase;
    --buttonLineHeight: 18px;
    --buttonTransform: scale(1.06);
    --buttonTextDecoration: none;

    --navArrowFill: #fff;

    --bodyBackgroundColor: #000000;
  }
`;

export default variables;

