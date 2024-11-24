(1) Add Custom Colors

    tailwind.config.js
    --------------------

      theme: {
            extend: {
                colors: {
                    mainColor: '#00f'
                },
                backgroundColor: {
                    mainColor: '#0F172A',
                    secondColor: '#222',
                    mobColor: '#151f35'
                },
            },
      },


    usage
    ----------

    <h1 className="text-5xl font-bold text-mainColor bg-secondColor">Hello world!</h1>

(2) Custom Value For Any Style

      - className="pt-[60px]"
      - className="opacity-[0.92]"

(3) Specify Width Of 'Container' In Each Screen

    theme: {
        extend: {
            zIndex: {
                '999': '999',
              },
        colors: {
            mainColor: '#00f'
        },
        backgroundColor: {
            mainColor: '#0F172A',
            secondColor: '#222',
            mobColor: '#151f35'
        },
        screens: {
            sm: '400px',
            md: '800px',
            lg: '1100px',
            xl: '1200px',
            '2xl' : '1400px'
        }
        },
    },

(4) Add Custom Classes For Combine Classes

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* @layer Comes From  (@tailwind components) */
    @layer{
        .element-center{
            @apply flex justify-center
        }
    }

    <div className="element-center"></div>

(5) 'place-items-center' with 'grid'

(6) 'w-fit' for prevent links to take full width if use flex and to make the link text to fit the content

(7) Custom Animation

    tailwind.config.js (Add keyframes and animation here)
    --------------------

      extend: {
        keyframes: {
          moveRight: {
            '0%': {transform: 'translateX(0%)'},
            '20%':  {transform: 'translateX(5%)'},
            '50%': { transform: 'translateX(10%)' },
            '70%': { transform: 'translateX(5%)' },
            '100%' :  {transform: 'translateX(0%)'},
          }
        },
        animation: {
          moveRight: 'moveRight 1s ease-in infinite'
        }
      },


      usage
      ----------

      <img src={pie_img} className="w-full h-full animate-moveRight" />

(8) Custom Shadow Values

(9) See Material tailwind plugin
