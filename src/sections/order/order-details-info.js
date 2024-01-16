import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { dataGrid } from 'src/theme/overrides/components/data-grid';

// ----------------------------------------------------------------------

export default function OrderDetailsInfo({ customer, delivery, payment, shippingAddress }) {
  // console.log(customer.prescriptionData)
  const renderCustomer = (
    <>
      <CardHeader
        title="Prescription Information"
      />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar
          alt={customer.providerData?.name}
          src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVEhIVFhUZFRYYHRgcHBkaGRUYGRgZHBkaGRocGhgcIS4lHB8rHxoYJjgnKzAxNTU1HCQ7QDs0Py40NTEBDAwMEA8QHxISHjErISs0NDQ1NDQ0NDQ0NDQ0NDQ0NDQ0NDQ1MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcBAgj/xAA+EAACAQIEBAMGAwYEBwEAAAABAgADEQQSITEFBkFhIlFxEzKBkaGxB8HRFEJSYuHwI3KCkjNDY6KywvEk/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAIxEBAQEAAQQCAgMBAAAAAAAAAAECEQMSITEEQSJRMnGBof/aAAwDAQACEQMRAD8A7NERAREQEREBERAREQEREBERAREQET5JtvMRxKDdgPU2PyMDNMOJxSU1zOwUd5Cc18zpgqWewdjaygjQHYntOE8xc11sVUZnchb6ICQo+Ei1MjtfEOfcJS3fMLkDJZjcdhsJWa/4qXq+CmPZC2jBgz33sQbD0sZxtsRvPpK15HlPEforhfPeFrKpL+zY7q3Tv3EstCurqHRgynUEbGfliliCCLHX7S7cG50encAglrXuSBfqwUdTbYWvaOTt/Tu09lF4Bzh7XLmGY7MBYaHZgGa2/wBpdaNUMoYbGTLyizhliIkoIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiB5K1zHzfQwoK5ler0QN9SenpMXN3MYoA0kVmqMt7hkUKDcA5mI1uOk4VxXib1KlixIAAJYg3Ki2h8pW1bOefa/cZ/EItfJmJ6A5MnqLX1lVxfNlZijB2VxrnBNz1F+wlXbFW0tPl695Xz9r+J6SHG+N1q9vaPnsAL2A7a23kHnve82yLzFUwxOwMtLIrZaw7Gx27T1YYEaG9vtPLaXB/X5SyrOunWbVGpYgjeaVNxNlRbWVq0TXC8cVqITfQ3NjbSde5L5hTKKRJtc5c25vrv21nDwxtJngnFXouAGsLC1yAB08u8r68rWc+H6TBiRHLPEBXwyP8DqDqNNxJeaMq9iIgIiICIiAiIgIiICIiAiIgIiICIiAiIgJhxNXKjt/CCfkJmkBzm5XB1GCh7FTZvc94C7/yi8DjPOXE2qVbF2La2uw10v06XNxKjialky213Nxrfs0mqtJnq1CVKWOgAuljc2v2BEguIC7lVNwPrIX+mjreb2CwpcgATSXeW7l7DeAHqZTq67c8tOjju1w2eHcGFtdZLLwZT0m/gqY0kxhsODOC71qu+ZzmelOx3LyMD4ZTeKcMNE9u87qmAUjWVvmTg6MpFrzXG9Z9+mW8Z34ntx866zaw7XmTHYBqblbaTEiWnX3TU5ji7bm8VuCx3M+6a6jQfGfKG+v9mfVvlK8r8Lz+H/Mj4Z/ZsCyMdVXU3uNQPjO10qgZVYG4YAg+YIuJ+a8DupuQQRrczs34eY93oFHcuVuVuDooJUjMRrYgHrbMJbN88Kaz45XOIiXZkREBERAREQEREBERAREQEREBERAREQEq3O9N6tH2ChR7QHVwcpZSCq5r2Vj085aZH8XwaVadnuVBzFQcua2wJ8r2gcY4jw79nw9J8yqai5wi65QdScx1GtxbtKFjKdrnvbW3rfedE5uYPUqMtthlTKpyU8oIUEbW8QInOMYdx9O3YyF2nT3Ev3B0CUxmIUADUkAfMyhp595e0FNEzVFDCwtm2HoPOY9bzxHR8fxzVgwNZG910b0ZT9jJnDvac6d8O5ungYW0F131Fr6G/S0sHAMWSQlyT09Jzax2+XTnfd4XNMUo95go8yQJGcU4vhtjWUnyW7fVRIbmCmoIz39L6SL4Zx6lSYhFOlrkIzWvtdgp+d7S2ZzPXKur233IxcZwqVAWRgw7dD5EbiU9vCxU9J1J2TEoKiAXtbMLXPYkbzm3MeFKV2PQW+sv0dfl2s+tnnM0xI+hmxTb5ecjaNTSSKJtNdRjmpKhTO23f+95178N1JpOzEltBYjULdspB8jrcdpyzAU8wCk2uf6b+hna+VeDfsyMABZghBBN/d1zA9bkn4yOnzadXiRYYiJu5yIiAiIgIiICIiAiIgIiICIiAiIgIiICanEGAQbXuoF7WuTYXv01m3MVSmGAB2uD5bQOXc6YQrUbVMxCl7DIAW8N1HVbBbmc0xfDru5Gutgf3beYJndOaeGmozKhzPUU3Bv4UXKSBlG7ECxbQWMpnMvCaOGw+RKjOXuzXt00te173+0haORMgFRV7j7zpOD4ctekqsAdBuLznOOTK+mp0Px3nR+VseDSRjpcfIjQ/UTn6/MksdXxuObK2aHLSq+dgpa1sxzMbWykb9RpMnDcKqYlMosF0+E3+I8UC09LZjtI/geMQ1DmY5tN95z3WtOmZzn6WHivDUrBlYb67XkLhuWEWoHYKzDQNY5rWta99NNPSWB8UjZlRmJsdhoD3OwkbgeMFXNOoBnHXa4847rFe2Vv/sQSnYKFAGwAE5pzbhrmo4G257f/AE/SdQr4wMhnIObeMM1WtQCqFDWLa5joDbtrL9PNuvCvU1M48q7T0YSeVPGp30HUflIWmt5O8KTMo02Iueg9fKdeo48XhauWeHPVZ2CG1ICoSBqANbAEWYm2x3F52XhGK9rQpOWViyqWK+7mIBItc232lK5BKi4DDM/vKB7wFxqCNBa/zMuuEwns3qZfdchgOikKFPzt3jM4iu7zW/ERLqEREBERAREQEREBERAREQEREBERAREQEREDAKChmcDxMACT5Lew7DU/OUPnDB1RSLLTLXRFJIAVHDbKl9ztmF950KQvNNAPhmuCSpzAA2uRf5wmPztxLhpDHSwB1IBIvbrfreSPK9XwMh0ZGOnZtQfnmmbjDlwxIsSfTr5dZD0MyVi6G6gAHpnvuLnqJnvPdnht09duuVq4k7UmzlDUUgbbqPTrrfabGFwbOQwwzuN7o3x6esx4LFCog1uLEf09Zv4DGPRJspPS6sVb466zlzx607vN8yp3ACqiALhWVdPeKjfuSPKQfHC9R7ihkKf8zOpF/wCEW36X6ayZw2PaofEGP+dyR/tHWbmJpgpa1hJ3cyfirxefP/EanhTxHYXPpONcQr+0r1ag2Z2YehY2+lp0fnPEMmEbKbZ2CE9cpvmA+At8ZzqhhTcab9Jp8fPEuq5/ka5syzYShc66aX1v+Us3L/Dya1HI1wfE67XA97fQ2/Oa/DMLmGSwTrnYnJZR+9bvLdw3hBfB4fEUNa1Jy2SzFgmYk3A1dbW1Hn1nQ5/S98ucNyV6rFQAbOmU6DMuWzA6hrX38zLTNHhtM2aowIaplYgixXQeE+l7fCb0lWvYiIQREQEREBERAREQEREBERAREQEREBERAREQE1MfhRUQqRfyvNuIHAeZeGutd1IsQbWkgeAAYYVHXMSLKNBl7zqeM5epVKvtGUHqR5kefafXFMNQTCuKhVKSAks2gUb/ANLSOFu5x3B8P9nhlxAa13KlOpsNW9BoO95PYDEo4F7XlTr8SavUZlUpQ/5SHQsC3vsO9tJkQMD4SR6Tk60nc7ujz2r/AIesg2AmOtic5yr8ZWsDTc+8xMn8GmUTG6+m3b9tLmbhorYfJcKFZWuQSAAddu15XX4IUqMgXMU1YXubFbo3+U7gy74lc1Nl3LDKB5s2ij5kTJzlwx6aUMXh/DiMKAAej07WZH81P5m06/jS6zY4fkWZ1Kp+G4LUGHdhsy5COtydNOpnR+ReH1aNJkqrYpYKLC6ggE69zeSvAsTQxNCliERQKihtVW4PUHuDcfCSgQXJ6m30m3HDC65ZIiJKCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiJirVlUXY2H39IGSYqtdV3IH3+Uja+OZtF8IPzmsyeZ/X5y0yjls4nix1CL8W/Scw4xjn4tjFwiuxwtE56zA2VyNlFtx0HxPQTY/ETmL2anDUjZ3HjI3VSPdH8xG/kPUSV5S4P+x8OqORaq6M7H+bKcq/DQet/OW4kPNUnEVBUq1HQZUJsgtayKMqgDpoPrM2Ep3HoYoYZksLX6SZ4RhLLUzixJuPlPL3rutr1s57ZIYVdQJJXtI5GVX30E2KWbEVUooCM+rN/Ag94+vQdyJnnN1eInd7ZzfSb5ewrVaoqsP8ADS+T+d7lSfRbEep7SycQw4em6NsQRPrCUFRFRBlVQAB5AaT3E+63pPW6eJjMkeT1N3euapH4cYplpYnDgkexxFQD/IwDgf7i8vS8Qtowv3E51+H5vieJHoao+YDAy9v5KNep6CaWSs+al6WIVtjMsryGx3m/QxbDQ6j6ylx+lpr9pOJjp1AwuDMkosREQEREBERAREQEREBERAREQEREBERA8kHjamdieikqP1kpjauVCep0HqZCr/w6nY/kJbMRWagvhU9hIjmPiww1F3Nsx8KA7FrE69gAWPYGTPurbyA+051xXGe3rVq3vUsKAEW+lSqWsi6/xVAp9ETo5l1UbyzwX9pxpetdhT8dS+5e9wht/NobdUcbWnRuOtlwdbsq3+LKDI3krh3s8OGJuXOcsd2J2Y9yPER5u0keOrmweJP8t/kwP5SvU/jf6Wx/Of3FNoEaGZarE7TRw7TbDaTx69lh9kB4j0l15W4dkpmows9Sx7qn7q/mfXtKzwXB/tNcKR/hpZn8j/CnxI17A+c6GBO34vS4/K/44vldXn8Z/rw7SNxoKU2IdvixYf8AdeSFZwqkkgAaknQATnfMfOhqK9HCUjULDSoQx0NwGpoouRobM5UHpmE7o4KfheM1PEv/AB1nN/UA/wDtL5XbKth1nKOSeP8A7AfYYqm6U3bMHKsChyhfEtvEmm6kkeVtuoPUDsCpBBAIINwQdQQeogY3bKt/Ow+ZtN0am3lv+kjsY3jpqPMH5azfXSwG51+JkjLTYhrg2t9TJRGuAfORewtN3BtoR5fn/f1mep9pzfptRESi5ERAREQEREBERAREQEREBERAREQIni1TxIvqT8poodSvmw+Vv6TJjnvVUzXDWqH0/p+c1zPCtRnOXFDSw7hSQ9Q5Et723iK9woNu+UdZV8RghTGCwmzVGZ3y7EqApF+gTPcdqQm9iKq4nifiP+FhVzG+2e4Ov+sL8aJ855jHdcamJek4o00Zbae0GbNmf2d75cpBt72h8N9JPpC6kBEsNOgmLiyf/jxA/wCm/wD4meUaodaZBDLa9xqD5EHvvNzEf8OoP5W+xldTmcJl4vLmNPSeVKrMQiDMzEKoG5J0AkljeE3bwOFU9CCSvpbcSW5T4Cqv7diXIuEJAA8mYDp1A18/OcGfja7vPp6OvlYmeZ7T3AOGDD0VTdj4nb+JzufToOwElDPAJ4zTvkknEedbbeao34nY9koU6Y1Wo6qwvbMguzKT5NlsexMnOHcPSlTVEXyLGwu7W1Zu/wBtANBIbnbhT4iphgpUAVFY5ibWysLCwPVhLPRTdjL+lEbzDwqnXoFHUEHr1F+oPQyB/DDEM2HqU2OYUXZVbzTW1u1w1vIWHSWfjlTJRZv4QW01Ogvt8JB/htgzTwCFveYm4tYjLoVI6EPnv3vAmQM1cdpJU92Y9duw6TR4ct6jtM+IqWFoo2Ea+s2cG3i9b/r+U1KPuibOH94SNeie0nERMWpERAREQEREBERAREQEREBERA8mOs1lJmSamObQCTPaKhsabMpkfjsUEFWodkRmPoouftN7HbSucyXbCYwDUmhU+PgbSaqoHgNN1wdTEWLO1UVHAGrCm92yjzzB3A6kz44rztSZCUY1XYAKoVwLnQXLDX0EsvI5D4RBvp9QWU/VTJelwfDo/tFoU1c6lwiB/wDda8izkl4RnIeCelhKdOpcOt3Kn90OSwX4eXTaWVzdXH8rfYzWvldT0PhP5fX7zby3PrpJFTooa1Raamw3YjcL1+J2+PaXKigVQALAAADoANpX+VcLal7Rh4qlm/0/u/TX4yaZyWi+0cthnmLNpPGMw4muEFzc28oGhxoeEP0RlPwvqZKP0AlV4Px8Y1MTTak1F0JBUm/hJNrmws2xIFx4hYm+lg4ZVz00Y+8Blbsy+E/aSh7xBQwVN8xt8Dv8cuY/CbNTRD6TXo+KoW6LoPU7/IW17sJ941x7N9dftfaBgwAsjtMOfM3aZn8NEDzt+v5TRw7+MAbdZMQmKe0z0D4l9R95rAzKhkX0mJmJ8qbgHzn1MGpERAREQEREBERAREQEREBERA8kXjWux7aT2JbPtFRWLaRNVA2dTqGVgR0IMRNVXzyzTRGqrTGWnfKFAsBoKjaf5qp+UsBM9iQNauLqR16es3cJUzKjf3fY/WIij6XwrYdNJjHnESVTNe3qPvMpQHcREipaOJ4Uji4JVtwy6EHzEj6WCxStUIZGU2uBdSSNLgG4DEddtNp5EDdo+1YZFpmkB+8zI1/P3WJ89TI7hnK37O9eoKpqNWa7Z+gDE6mxLHW1ydtra3RJQ3eOVMgRR5H8h+swcNXrES0/ir9pRTM6zyJWpS2HN1X+9tJmiJhWsIiISREQP//Z'
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{`${customer.providerData?.title} ${customer.providerData?.name}`}</Typography>

          <Box sx={{ color: 'text.secondary' }}>{customer.providerData?.email}</Box>

          <Box>
            
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {customer.providerData?.phoneNumber}
            </Box>
          </Box>

          <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="teenyicons:messenger-outline" />}
            sx={{ mt: 1 }}
          >
            Contact Doctor
          </Button>
        </Stack>
      </Stack>
    </>
  );

  const renderDelivery = (
    <>
      <CardHeader
        title="Notes"
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Typography gutterBottom variant="body2" >
          {customer.prescriptionData?.additionalNotes}
        </Typography>
      </Stack>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader
        title="Dosage"
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Address
          </Box>
          hold
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Phone number
          </Box>
          hold
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader
        title="Payment"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack direction="row" alignItems="center" sx={{ p: 3, typography: 'body2' }}>
        <Box component="span" sx={{ color: 'text.secondary', flexGrow: 1 }}>
          Phone number
        </Box>

        hold
        <Iconify icon="logos:mastercard" width={24} sx={{ ml: 0.5 }} />
      </Stack>
    </>
  );

  return (
    <Card>
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderDelivery}

      <Divider sx={{ borderStyle: 'dashed' }} />
{/* 
      {renderShipping}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment} */}
    </Card>
  );
}

OrderDetailsInfo.propTypes = {
  customer: PropTypes.object,
  delivery: PropTypes.object,
  payment: PropTypes.object,
  shippingAddress: PropTypes.object,
};
