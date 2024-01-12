import orderBy from 'lodash/orderBy';
import axios from 'axios';
import isEqual from 'lodash/isEqual';
import { useState, useCallback, useContext, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { AuthContext } from 'src/auth/context/jwt';

// _mock
import { JOB_SORT_OPTIONS } from 'src/_mock';
// assets
// components
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProvidersList from '../providers-list';
import ProviderSort from '../providers-sort';
import ProviderSearch from '../providers-search';
import ProviderFiltersResult from '../providers-filters-result';

// ----------------------------------------------------------------------

const defaultFilters = {
  roles: [],
  locations: [],
  benefits: [],
  experience: 'all',
  employmentTypes: [],
};

// ----------------------------------------------------------------------

export default function ProvidersListView() {
  const settings = useSettingsContext();
  const { user } = useContext(AuthContext);
  const { token } = user;
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://abibiman-api.onrender.com/providercategory', {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`https://abibiman-api.onrender.com/providers/${id}`, {
  //         headers: {
  //           Authorization: `Basic ${token}`,
  //         },
  //       });
  //       setDataTest(response.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dataTest]);

  // console.log(dataTest);

  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: data,
    filters,
    sortBy,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = data.filter(
          (provider) => provider.category.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        );
        console.log(results, inputValue);
        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [data]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <ProviderSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id) => `/dashboard/providers/specialty/${id}`}
      />
    </Stack>
  );

  const renderResults = (
    <ProviderFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Service Categories"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Service Providers',
            href: paths.dashboard.providers.root,
          },
          { name: 'Categories' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent filled title="No Data" sx={{ py: 10 }} />}

      {loading ? <LoadingScreen /> : <ProvidersList providers={dataFiltered} />}
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { employmentTypes, experience, roles, locations, benefits } = filters;

  // SORT BY
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // FILTERS
  if (employmentTypes.length) {
    inputData = inputData.filter((job) =>
      job.employmentTypes.some((item) => employmentTypes.includes(item))
    );
  }

  if (experience !== 'all') {
    inputData = inputData.filter((job) => job.experience === experience);
  }

  if (roles.length) {
    inputData = inputData.filter((job) => roles.includes(job.role));
  }

  if (locations.length) {
    inputData = inputData.filter((job) => job.locations.some((item) => locations.includes(item)));
  }

  if (benefits.length) {
    inputData = inputData.filter((job) => job.benefits.some((item) => benefits.includes(item)));
  }

  return inputData;
};
